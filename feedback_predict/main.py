import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
import os

app = FastAPI()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Store the last fallback description to prevent repeating the same one consecutively
last_fallback_description = None

# Function to get ADHD-friendly description using ChatCompletion (OpenAI API)
def get_openai_description(chapter_name):
    prompt = f"Give a simple ADHD-friendly description of the chapter: {chapter_name}"
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates ADHD-friendly descriptions."},
                {"role": "user", "content": prompt}
            ]
        )
        return response['choices'][0]['message']['content'].strip()

    except Exception as e:
        print(f"OpenAI API failed: {e}")
        return None

# Static fallback ADHD-friendly descriptions
fallback_descriptions = [
    "Break your learning into short sessions and focus on one concept at a time.",
    "Focus on key points, summarize your notes, and take regular breaks to help with retention.",
    "To improve understanding, use mind maps or diagrams to visualize the key concepts.",
    "Take it slow, study in bursts, and make sure to review the difficult sections carefully.",
    "Practice makes perfect. Go over the chapter’s exercises and quizzes to strengthen your understanding."
]

# Function to get a random fallback description, ensuring it's not the same as the last one
def get_fallback_description(chapter_name):
    global last_fallback_description

    available_descriptions = [desc for desc in fallback_descriptions if desc != last_fallback_description]
    
    if not available_descriptions:
        available_descriptions = fallback_descriptions

    description = random.choice(available_descriptions)
    last_fallback_description = description

    return f"The chapter '{chapter_name}' is important. {description}"

@app.get('/get_description')
async def get_description(chapter: str):
    if not chapter:
        raise HTTPException(status_code=400, detail="Chapter name is required")
    
    # Try to fetch description from OpenAI
    description = get_openai_description(chapter)
    
    # If OpenAI API fails, return a static fallback description
    if not description:
        description = get_fallback_description(chapter)
    
    return {"description": description}
