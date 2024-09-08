# Step 1: Use an official Python runtime as the parent image
FROM python:3.10-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the requirements file first to leverage Docker's caching
COPY requirements.txt .

# Step 4: Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the entire project into the container
COPY . .

# Step 6: Expose port 9000 (for documentation purposes)
EXPOSE 9000

# Step 7: Add the app directory to the Python path
ENV PYTHONPATH=/app

# Step 8: Run the application with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9000"]
