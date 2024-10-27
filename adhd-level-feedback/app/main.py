from fastapi import FastAPI
from app.api.v1.endpoints import adhd_feedback

app = FastAPI()

app.include_router(adhd_feedback.router, prefix="/api/v1", tags=["ADHD Feedback"])
