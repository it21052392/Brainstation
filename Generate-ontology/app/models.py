# app/models.py
from pydantic import BaseModel
from typing import List

# Define the input slide model
class Slide(BaseModel):
    id: int
    title: str
    content: str

# Define the input data model which is a list of slides
class SlideData(BaseModel):
    slides: List[Slide]
