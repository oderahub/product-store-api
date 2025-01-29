FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port your application runs on
EXPOSE 5000

# Define the command to run the application
CMD ["node", "dist/index.js"]
