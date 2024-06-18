
# Use Node 20.9.0-alpine as parent image
FROM node:20.9.0-alpine AS BUILD_IMAGE

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY package.json ./

# RUN npm install -g npm@10.4.0

# Install dependencies
RUN npm install

RUN npm install -g typescript

# Copy the rest of project files into this image
COPY . .



# Build the project
RUN npm run build

# Expose application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]