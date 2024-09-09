# from fastapi import FastAPI
# from pydantic import BaseModel
# import pandas as pd
# import joblib
# from sklearn.metrics.pairwise import cosine_similarity
# import numpy as np

# # Load the model from the file
# model = joblib.load('exam_score_predictor.pkl')

# app = FastAPI()

# def recommend_task_collaborative(student_id):
#     df = pd.read_csv('student_learning_data_all.csv')
#     # Simulated task interaction matrix
#     tasks = {
#         'Student_ID': df['Student_ID'],
#         'Task_Group_1': np.random.randint(0, 2, size=1000),
#         'Task_Group_2': np.random.randint(0, 2, size=1000),
#         'Task_Group_3': np.random.randint(0, 2, size=1000),
#         'Task_Group_4': np.random.randint(0, 2, size=1000),
#         'Task_Group_5': np.random.randint(0, 2, size=1000)
#     }
#     task_df = pd.DataFrame(tasks)
    
#     # Extract the task preferences for the student
#     student_tasks = task_df[task_df['Student_ID'] == student_id].drop('Student_ID', axis=1)
    
#     if student_tasks.empty:
#         return "Student not found."

#     task_features = task_df.drop('Student_ID', axis=1)
#     task_similarity = cosine_similarity(task_features, task_features)
#     collab_recommendations = task_similarity.dot(task_features)
#     collab_recommendations_df = pd.DataFrame(collab_recommendations, columns=task_features.columns)
    
#     # Recommend the top task group for the student
#     recommended_task = collab_recommendations_df.loc[0].idxmax().replace('Task_Group_', 'Task Group ')
    
#     return recommended_task


# # Define the FastAPI input model
# class StudentData(BaseModel):
#     Student_id : int
#     Emotional_State: str
#     Time_Spent_Studying: str
#     Focus_Level: int
#     Cumulative_Average_Quiz_Score: float

# @app.post("/predict/")
# def predict_exam_score(data: StudentData):
#     # Convert input data to a DataFrame
#     input_data = pd.DataFrame({
#         'Emotional_State': [data.Emotional_State],
#         'Time_Spent_Studying': [data.Time_Spent_Studying],
#         'Focus_Level': [data.Focus_Level],
#         'Cumulative_Average_Quiz_Score': [data.Cumulative_Average_Quiz_Score]
#     })

#     # Convert 'Time_Spent_Studying' to numeric
#     input_data['Time_Spent_Studying'] = input_data['Time_Spent_Studying'].str.extract('(\d+)').astype(int)

#     # Predict the exam score
#     predicted_scores = model.predict(input_data)

#     recomnded_task_group = recommend_task_collaborative(data.Student_id)

#     Performer_type = ""
#     if data.Cumulative_Average_Quiz_Score > 80 :
#         Performer_type = "Excellent Performer"
#     elif data.Cumulative_Average_Quiz_Score > 50 :
#         Performer_type = "Medium Performer"
#     else:
#         Performer_type = "Low Performer"

#     # Return the prediction as JSON
#     return {"predicted_exam_score": predicted_scores[0],"task_group": recomnded_task_group,"Performer_Type": Performer_type}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load the model from the file
model = joblib.load('exam_score_predictor.pkl')

app = FastAPI()

# Define tasks for each task group
task_group_tasks = {
    "Task Group 1": [
        "Start Doing Past Papers",
        "Create a Study Schedule",
        "Join a Study Group",
        "Review Lecture Notes"
    ],
    "Task Group 2": [
        "Find Real-World Applications",
        "Take Regular Breaks",
        "Weekly Review Sessions",
        "Use Flashcards for Revision"
    ],
    "Task Group 3": [
        "Practice Time Management",
        "Experiment with Different Study Techniques",
        "Set Specific Goals",
        "Seek Feedback from Instructors"
    ],
    "Task Group 4": [
        "Participate in Online Forums",
        "Revise Key Topics",
        "Watch Educational Videos",
        "Keep a Learning Journal"
    ],
    "Task Group 5": [
        "Work on Weak Areas",
        "Take Practice Quizzes",
        "Engage in Peer Teaching",
        "Attend Extra Help Sessions"
    ]
}

def recommend_task_collaborative(student_id):
    df = pd.read_csv('student_learning_data_all.csv')
    # Simulated task interaction matrix
    tasks = {
        'Student_ID': df['Student_ID'],
        'Task_Group_1': np.random.randint(0, 2, size=1000),
        'Task_Group_2': np.random.randint(0, 2, size=1000),
        'Task_Group_3': np.random.randint(0, 2, size=1000),
        'Task_Group_4': np.random.randint(0, 2, size=1000),
        'Task_Group_5': np.random.randint(0, 2, size=1000)
    }
    task_df = pd.DataFrame(tasks)
    
    # Extract the task preferences for the student
    student_tasks = task_df[task_df['Student_ID'] == student_id].drop('Student_ID', axis=1)
    
    if student_tasks.empty:
        return "Student not found."

    task_features = task_df.drop('Student_ID', axis=1)
    task_similarity = cosine_similarity(task_features, task_features)
    collab_recommendations = task_similarity.dot(task_features)
    collab_recommendations_df = pd.DataFrame(collab_recommendations, columns=task_features.columns)
    
    # Recommend the top task group for the student
    recommended_task_group = collab_recommendations_df.loc[0].idxmax().replace('Task_Group_', 'Task Group ')
    
    # Get the tasks for the recommended task group
    recommended_tasks = task_group_tasks[recommended_task_group]
    
    return recommended_task_group, recommended_tasks


# Define the FastAPI input model
class StudentData(BaseModel):
    Student_id: int
    Emotional_State: str
    Time_Spent_Studying: str
    Focus_Level: int
    Cumulative_Average_Quiz_Score: float

@app.post("/predict/")
def predict_exam_score(data: StudentData):
    # Convert input data to a DataFrame
    input_data = pd.DataFrame({
        'Emotional_State': [data.Emotional_State],
        'Time_Spent_Studying': [data.Time_Spent_Studying],
        'Focus_Level': [data.Focus_Level],
        'Cumulative_Average_Quiz_Score': [data.Cumulative_Average_Quiz_Score]
    })

    # Convert 'Time_Spent_Studying' to numeric
    input_data['Time_Spent_Studying'] = input_data['Time_Spent_Studying'].str.extract('(\d+)').astype(int)

    # Predict the exam score
    predicted_scores = model.predict(input_data)

    recommended_task_group, recommended_tasks = recommend_task_collaborative(data.Student_id)

    Performer_type = ""
    if data.Cumulative_Average_Quiz_Score > 80 :
        Performer_type = "Excellent Performer"
    elif data.Cumulative_Average_Quiz_Score > 50 :
        Performer_type = "Medium Performer"
    else:
        Performer_type = "Low Performer"

    # Return the prediction as JSON
    return {
        "predicted_exam_score": predicted_scores[0],
        "task_group": recommended_task_group,
        "tasks": recommended_tasks,
        "Performer_Type": Performer_type
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9002)
