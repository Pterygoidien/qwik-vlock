# Use an official Node.js runtime as a parent image
FROM node:18-alpine3.17

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the app files to the container
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 8080

# Start the app
CMD ["npm", "run", "start"]