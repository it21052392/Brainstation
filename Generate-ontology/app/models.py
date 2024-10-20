# app/models.py
from pydantic import BaseModel
from typing import List, Optional

# Define the input slide model
class Slide(BaseModel):
    id: int
    title: Optional[str] = "Untitled"
    content: str

# Define the input data model which is a list of slides
class SlideData(BaseModel):
    __root__: List[Slide]