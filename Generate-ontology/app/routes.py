# app/routes.py
import os
from fastapi import APIRouter, HTTPException
from app.models import SlideData
from app.gpt_api import generate_mindmap

router = APIRouter()

@router.post("/generate-mindmap/")
async def generate_mindmap_from_slides(data: SlideData):
    try:
        # Concatenate the content from all the slides
        concatenated_content = "\n\n".join([f"## {slide.title}\n\n{slide.content}" for slide in data.slides])

        # Call the GPT-4 function to generate the mindmap
        mindmap_md = await generate_mindmap(concatenated_content)

        return {"mindmap": mindmap_md}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")
