from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from io import BytesIO
from app.pptx_processor import extract_and_expand_content, format_notes_to_json

app = FastAPI()

# Configure CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://34.30.64.175:9009"],  # Add your development URL here
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/upload/")
async def upload_pptx(file: UploadFile = File(...)):
    try:
        pptx_data = await file.read()

        # Process the file content
        slides_content = await extract_and_expand_content(BytesIO(pptx_data))

        # Format the notes to JSON
        formatted_json = format_notes_to_json(slides_content)

        # Return the JSON response
        return {"slides": formatted_json}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the file: {str(e)}")
