# Use the tiangolo/uvicorn-gunicorn image with Python 3.8 as the base image
FROM tiangolo/uvicorn-gunicorn:python3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the application code into the container
COPY ./app /app

# Copy the requirements file
COPY ./app/requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Expose the application port
EXPOSE 9003

# Set environment variables for workers and concurrency
ENV MAX_WORKERS="1"
ENV WEB_CONCURRENCY="1"

# Run the FastAPI application using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9003"]
