from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from app.pptx_processor import extract_and_expand_content, format_notes_to_json

app = FastAPI()

# Configure CORS settings to allow requests from your development URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://34.30.64.175:9009"],  # Development URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define maximum file size (50 MB in this example)
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50 MB

@app.post("/upload/")
async def upload_pptx(file: UploadFile = File(...)):
    try:
        # Read file content
        pptx_data = await file.read()

        # Check if file exceeds the maximum size limit
        if len(pptx_data) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail="File too large")

        # Process the file content if within the size limit
        slides_content = await extract_and_expand_content(BytesIO(pptx_data))

        # Format the notes to JSON
        formatted_json = format_notes_to_json(slides_content)

        # Return the JSON response
        return {"slides": formatted_json}

    except HTTPException as http_ex:
        # Re-raise HTTP exceptions (e.g., 413 for file too large)
        raise http_ex
    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(status_code=500, detail=f"Error processing the file: {str(e)}")
