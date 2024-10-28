from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import os

# Load the trained model
model_path = './exam_score_predictor.pkl'

# Initialize model as None to handle cases when the model is not loaded properly
model = None

if os.path.exists(model_path):
    try:
        model = joblib.load(model_path)
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")
else:
    print(f"Model file not found at: {model_path}")

# Define the input schema for prediction
class PredictionInput(BaseModel):
    focus_level: int
    cumulative_average: float
    time_spent_studying: int

app = FastAPI()

# Endpoint for predicting exam score
@app.post("/predict_exam_score/")
async def predict_exam_score(input_data: PredictionInput):
    # Check if the model is loaded
    if model is None:
        return {"error": "Model not loaded properly. Ensure the model is available and valid."}

    # Prepare input data for the model
    input_df = pd.DataFrame([{
        'Focus_Level': input_data.focus_level,
        'Cumulative_Average_Quiz_Score': input_data.cumulative_average,
        'Time_Spent_Studying': input_data.time_spent_studying
    }])

    try:
        # Make the prediction using the trained model
        predicted_scores = model.predict(input_df)
        return {"predicted_exam_score": predicted_scores[0]}
    except Exception as e:
        # Handle any prediction errors
        return {"error": f"Prediction error: {e}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=9008)
