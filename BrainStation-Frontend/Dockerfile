# Step 1: Use an official node image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy SSL certificates and the rest of the application to the container
COPY . .

# Step 6: Expose port 5173 (default Vite port)
EXPOSE 5173

# Step 7: Run the Vite development server (HTTPS is now configured in vite.config.js)
CMD ["npm", "run", "dev"]
