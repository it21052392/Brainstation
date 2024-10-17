import cv2
import dlib
import numpy as np
import time
from keras.models import model_from_json
from collections import defaultdict, deque, Counter
from fastapi import FastAPI, WebSocket, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.websockets import WebSocketDisconnect
from pydantic import BaseModel
import asyncio
import urllib.request

app = FastAPI()

# Add CORS Middleware to allow requests from the frontend (localhost or other origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins. You can specify your domain or localhost.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load emotion detection model
emotion_dict = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}
json_file = open('model/emotion_model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
emotion_model = model_from_json(loaded_model_json)
emotion_model.load_weights("model/emotion_model.h5")
print("Loaded emotion model from disk")

# Download the facial landmark predictor model file
url = 'https://github.com/italojs/facial-landmarks-recognition/raw/master/shape_predictor_68_face_landmarks.dat'
landmark_file = 'shape_predictor_68_face_landmarks.dat'
urllib.request.urlretrieve(url, landmark_file)
print("Downloaded shape_predictor_68_face_landmarks.dat")

# Initialize dlib's face detector and create a face predictor for head movement detection
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(landmark_file)  # Use the downloaded file

# Define 3D model points of the face for head pose estimation
model_points = np.array([
    (0.0, 0.0, 0.0),         # Nose tip
    (0.0, -330.0, -65.0),     # Chin
    (-225.0, 170.0, -135.0),  # Left eye left corner
    (225.0, 170.0, -135.0),   # Right eye right corner
    (-150.0, -150.0, -125.0), # Left mouth corner
    (150.0, -150.0, -125.0)   # Right mouth corner
])

# Constants for movement classification and look-away detection
MOVEMENT_THRESHOLD = 15
LOOK_AWAY_THRESHOLD_SECONDS = 10
INTERVAL_DURATION = 60
SMOOTHING_FRAMES = 5
YAW_LEFT_THRESHOLD = -45
YAW_RIGHT_THRESHOLD = 45
YAW_SMOOTHING_ALPHA = 0.9

# Function to reset session data
def reset_session_data():
    return {
        "prev_landmark_points": None,
        "movement_history": deque(maxlen=SMOOTHING_FRAMES),
        "smoothed_yaw": None,
        "look_away_start_time": None,
        "looking_away": False,
        "emotion_data": defaultdict(int),
        "movement_data": {"smooth": 0, "erratic": 0},
        "focus_time": 0,
        "interval_start_time": None,
        "interval_count": 0,
        "interval_classifications": [],
        "asrs_result": None,  # Placeholder to be received from the frontend
        "running": False
    }

# State management variables
session_data = reset_session_data()

# Pydantic model to accept ASRS result from frontend
class ASRSResult(BaseModel):
    asrs_result: str

# API Endpoint to receive ASRS result from frontend
@app.post("/asrs_result")
async def receive_asrs_result(asrs_result: ASRSResult):
    global session_data  # Mark session_data as global
    session_data["asrs_result"] = asrs_result.asrs_result
    return {"message": "ASRS result received", "asrs_result": session_data["asrs_result"]}

# Function to calculate head pose
def get_head_pose(landmark_points, frame_size):
    focal_length = frame_size[1]
    center = (frame_size[1] // 2, frame_size[0] // 2)
    camera_matrix = np.array([[focal_length, 0, center[0]], [0, focal_length, center[1]], [0, 0, 1]], dtype="double")
    dist_coeffs = np.zeros((4, 1))  # Assuming no lens distortion
    success, rotation_vector, translation_vector = cv2.solvePnP(model_points, landmark_points, camera_matrix, dist_coeffs)
    return rotation_vector, translation_vector, camera_matrix, dist_coeffs

# Function to classify head direction based on yaw
def classify_head_direction(yaw):
    if yaw < YAW_LEFT_THRESHOLD:
        return "Looking Left"
    elif yaw > YAW_RIGHT_THRESHOLD:
        return "Looking Right"
    else:
        return "Looking Forward"

# Function to smooth yaw angle using weighted moving average
def smooth_yaw(current_yaw, smoothed_yaw, alpha=YAW_SMOOTHING_ALPHA):
    if smoothed_yaw is None:
        return current_yaw
    return alpha * smoothed_yaw + (1 - alpha) * current_yaw

# Optimize Emotion Detection by batching
async def process_frame(frame, session_data):
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray_frame)

    # Initialize movement_type before processing faces
    movement_type = 'smooth'  # Default movement type in case no faces are detected

    if not faces:
        return session_data

    # Batch process emotion detections
    faces_data = []
    for face in faces:
        x, y, w, h = face.left(), face.top(), face.width(), face.height()
        roi_gray_frame = gray_frame[y:y + h, x:x + w]
        cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0)
        faces_data.append(cropped_img)

    # Predict emotions in a batch
    if faces_data:
        predictions = emotion_model.predict(np.vstack(faces_data))

    for i, face in enumerate(faces):
        landmarks = predictor(gray_frame, face)
        landmark_points = np.array([
            (landmarks.part(30).x, landmarks.part(30).y),  # Nose tip
            (landmarks.part(8).x, landmarks.part(8).y),    # Chin
            (landmarks.part(36).x, landmarks.part(36).y),  # Left eye left corner
            (landmarks.part(45).x, landmarks.part(45).y),  # Right eye right corner
            (landmarks.part(48).x, landmarks.part(48).y),  # Left mouth corner
            (landmarks.part(54).x, landmarks.part(54).y)   # Right mouth corner
        ], dtype="double")

        # Head movement and pose
        rotation_vector, translation_vector, camera_matrix, dist_coeffs = get_head_pose(landmark_points, frame.shape)
        rotation_matrix, _ = cv2.Rodrigues(rotation_vector)
        yaw = np.arctan2(rotation_matrix[1][0], rotation_matrix[0][0]) * 180.0 / np.pi
        smoothed_yaw = smooth_yaw(yaw, session_data["smoothed_yaw"])
        head_direction = classify_head_direction(smoothed_yaw)

        # Detect movements (smooth/erratic)
        if session_data["prev_landmark_points"] is not None:
            movement_vectors = np.abs(landmark_points - session_data["prev_landmark_points"]).sum(axis=1)  # Optimized movement detection
            avg_movement_vector = np.mean(movement_vectors)
            session_data["movement_history"].append(avg_movement_vector)
            smoothed_movement = np.mean(session_data["movement_history"])
            movement_type = "erratic" if smoothed_movement > MOVEMENT_THRESHOLD else "smooth"
            session_data["movement_data"][movement_type] += 1

        session_data["prev_landmark_points"] = landmark_points

        # Emotion detection from the batch
        maxindex = int(np.argmax(predictions[i]))
        emotion = emotion_dict[maxindex]
        session_data["emotion_data"][emotion] += 1

        # Focus time tracking
        if movement_type == 'smooth' and emotion in ['Neutral', 'Happy']:
            session_data["focus_time"] += 1 / 30  # Assuming 30 FPS

        # Look away detection
        if head_direction != "Looking Forward":
            if not session_data["looking_away"]:
                session_data["look_away_start_time"] = time.time()
                session_data["looking_away"] = True
            elif time.time() - session_data["look_away_start_time"] >= LOOK_AWAY_THRESHOLD_SECONDS:
                session_data["movement_data"]['erratic'] += 1
        else:
            session_data["looking_away"] = False

    return session_data

# API Endpoint to start session
@app.websocket("/start_session")
async def start_session(websocket: WebSocket):
    global session_data  # Mark session_data as global
    session_data = reset_session_data()  # Reset session data for a fresh start
    await websocket.accept()
    session_data["running"] = True
    session_data["interval_start_time"] = time.time()
    frame_counter = 0

    try:
        while session_data["running"]:
            # Receiving frames (use appropriate method to receive frames from frontend)
            frame_data = await websocket.receive_bytes()
            nparr = np.frombuffer(frame_data, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            # Process every 3rd frame to improve performance
            if frame_counter % 3 == 0:
                session_data = await process_frame(frame, session_data)

            frame_counter += 1

            # Check for interval completion
            if time.time() - session_data["interval_start_time"] >= INTERVAL_DURATION:
                session_data["interval_count"] += 1
                total_movements = session_data["movement_data"]["smooth"] + session_data["movement_data"]["erratic"]
                avg_erratic_percentage = (session_data["movement_data"]["erratic"] / total_movements) * 100 if total_movements > 0 else 0
                total_emotions = sum(session_data["emotion_data"].values())
                avg_emotions = {emotion: (count / total_emotions) * 100 for emotion, count in session_data["emotion_data"].items()}

                # Classification logic
                classification = classify_session(session_data["asrs_result"], avg_erratic_percentage, avg_emotions)
                session_data["interval_classifications"].append(classification)

                # Reset interval data
                session_data["emotion_data"] = defaultdict(int)
                session_data["movement_data"] = {"smooth": 0, "erratic": 0}
                session_data["interval_start_time"] = time.time()

            await asyncio.sleep(0.01)  # Give some delay to avoid overloading the loop

    except WebSocketDisconnect:
        print("WebSocket disconnected")
        session_data["running"] = False
        # Handle cleanup if needed

# API Endpoint to stop session and provide results
@app.post("/stop_session")
async def stop_session():
    global session_data  # Mark session_data as global
    session_data["running"] = False

    # Check if there are any interval classifications
    if len(session_data["interval_classifications"]) == 0:
        # If no classifications were made, return a default response
        return JSONResponse(content={
            "message": "No classifications available",
            "focus_time": session_data["focus_time"]
        })

    # If classifications exist, find the most common one
    final_classification = Counter(session_data["interval_classifications"]).most_common(1)[0][0]
    focus_time = session_data["focus_time"]

    # Gather statistical information
    total_movements = session_data["movement_data"]["smooth"] + session_data["movement_data"]["erratic"]
    avg_erratic_percentage = (session_data["movement_data"]["erratic"] / total_movements) * 100 if total_movements > 0 else 0
    total_emotions = sum(session_data["emotion_data"].values())
    avg_emotions = {emotion: (count / total_emotions) * 100 for emotion, count in session_data["emotion_data"].items()}

    # Prepare statistical report
    stats_report = {
        "final_classification": final_classification,
        "focus_time": focus_time,
        "total_movements": total_movements,
        "erratic_movements": session_data["movement_data"]["erratic"],
        "erratic_percentage": avg_erratic_percentage,
        "emotion_distribution": avg_emotions
    }

    # Print the statistical report to console
    print(f"\nStatistical Report for Interval {session_data['interval_count']}")
    print(f"Total Movements Detected: {total_movements}")
    print(f"Erratic Movements: {session_data['movement_data']['erratic']} ({avg_erratic_percentage:.2f}%)")
    print("Emotion Distribution:")
    for emotion, percentage in avg_emotions.items():
        print(f"{emotion}: {percentage:.2f}%")

    # Return the statistical report as JSON
    return JSONResponse(content=stats_report)

# Function to classify session based on ASRS result and collected data
def classify_session(asrs_result, avg_erratic_percentage, avg_emotions):
    if asrs_result == "Positive":
        if avg_erratic_percentage > 50 and any(emotion in avg_emotions and avg_emotions[emotion] > 20 for emotion in ['Angry', 'Sad', 'Fearful', 'Disgusted']):
            return "ADHD symptoms with emotional and head movement alterations"
        elif any(emotion in avg_emotions and avg_emotions[emotion] > 20 for emotion in ['Angry', 'Sad', 'Fearful', 'Disgusted']):
            return "ADHD symptoms with emotional alterations"
        elif avg_erratic_percentage > 50:
            return "ADHD symptoms with head movement alterations"
        else:
            return "ADHD symptoms detected, consider monitoring"
    else:
        if avg_erratic_percentage > 50 and any(emotion in avg_emotions and avg_emotions[emotion] > 20 for emotion in ['Angry', 'Sad', 'Fearful', 'Disgusted']):
            return "No ADHD symptoms with emotional and head movement alterations"
        elif any(emotion in avg_emotions and avg_emotions[emotion] > 20 for emotion in ['Angry', 'Sad', 'Fearful', 'Disgusted']):
            return "No ADHD symptoms with emotional alterations"
        elif avg_erratic_percentage > 50:
            return "No ADHD symptoms with head movement alterations"
        else:
            return "No ADHD symptoms"
