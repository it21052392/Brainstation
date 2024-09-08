from fastapi import FastAPI, UploadFile, File, HTTPException
from io import BytesIO
from app.pptx_processor import extract_and_expand_content, format_notes_to_json

app = FastAPI()

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