# Use an official Node.js runtime as a parent image (Node 12)
FROM node:12-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
# COPY package*.json ./

# Copy the node_modules directory
# This assumes you have a node_modules directory in the same context as the Dockerfile
# If your node_modules are specific to your host OS/arch, 
# you might prefer to copy package.json and run 'npm install' in the Dockerfile
COPY node_modules ./node_modules

# Copy the application code
COPY 1b.js .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable for MongoDB connection string (optional, can be hardcoded in 1b.js for simplicity in lab)
# ENV MONGO_URL=mongodb://mongo:27017/student_records

# Run 1b.js when the container launches
CMD [ "node", "1b.js" ]
