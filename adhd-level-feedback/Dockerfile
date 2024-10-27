# Use an official Python image as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the dependencies from requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that the app runs on
EXPOSE 9005

# Run the FastAPI app with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9005"]
