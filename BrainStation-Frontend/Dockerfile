# Step 1: Use an official node image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy SSL certificates (Make sure they are in the correct directory)
# These lines assume the vm.crt and vm.key are in the same directory as the Dockerfile.
COPY ./localhost.crt /app/localhost.crt
COPY ./localhost.key /app/localhost.key

# Step 6: Copy the rest of the application to the container
COPY . .

# Step 7: Expose port 5173 (default Vite port)
EXPOSE 5173

# Step 8: Run the Vite development server with HTTPS using the copied certificates
CMD ["npm", "run", "dev", "--", "--https", "--cert", "/app/vm.crt", "--key", "/app/vm.key"]
