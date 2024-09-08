# app/main.py
from fastapi import FastAPI
from app.routes import router

app = FastAPI()

# Include the routes defined in routes.py
app.include_router(router)

# For health check or basic route
@app.get("/")
async def root():
    return {"message": "Welcome to the Ontology Mindmap Generator API"}