# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Install system dependencies for OpenSSL and other required tools
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    cmake \
    build-essential \
    python3-dev \
    openssl \
    && apt-get clean

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements file into the container
COPY requirements.txt ./

# Upgrade pip
RUN pip install --upgrade pip

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Generate a self-signed certificate
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/selfsigned.key \
    -out /etc/ssl/certs/selfsigned.crt \
    -subj "/CN=34.30.64.175"

# Expose port 443 for HTTPS
EXPOSE 443

# Run the FastAPI app using Uvicorn with HTTPS
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/etc/ssl/private/selfsigned.key", "--ssl-certfile", "/etc/ssl/certs/selfsigned.crt"]
