from fastapi import FastAPI
from app.api.v1.endpoints import generate_questions

app = FastAPI()

app.include_router(generate_questions.router, prefix="/api/v1", tags=["Generate Questions"])
