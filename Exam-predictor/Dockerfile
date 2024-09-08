# Step 1: Use an official Python runtime as a parent image
FROM python:3.10-slim

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the requirements file and install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Step 4: Copy the entire project into the container
COPY . .

EXPOSE 9002

# Step 5: Expose port if necessary (for any web service, if you're planning to host one)
# EXPOSE 9002  # Optional: Uncomment if you need to expose a port

# Step 6: Run the application (assuming main.py is the entry point)
CMD ["python", "main.py"]
