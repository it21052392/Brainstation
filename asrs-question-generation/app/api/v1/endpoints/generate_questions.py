from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.openai_service import generate_alternative_questions

router = APIRouter()

class QuestionRequest(BaseModel):
    questions: list[str]

class QuestionResponse(BaseModel):
    alternatives: list[str]

@router.post("/generate-questions")
async def generate_questions(request: QuestionRequest):
    try:
        alternatives = await generate_alternative_questions(request.questions)
        return {"alternatives": alternatives}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing the file: {str(e)}")
