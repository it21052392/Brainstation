from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.openai_service import generate_feedback_and_advice

router = APIRouter()

class FeedbackRequest(BaseModel):
    designation: str

class FeedbackResponse(BaseModel):
    feedback: str

@router.post("/adhd-feedback", response_model=FeedbackResponse)
async def get_feedback(request: FeedbackRequest):
    try:
        feedback = await generate_feedback_and_advice(request.designation)
        return {"feedback": feedback}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating feedback: {str(e)}")
