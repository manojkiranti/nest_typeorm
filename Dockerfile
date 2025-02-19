# Stage 1: Build the application
FROM node:20.16.0-alpine as build

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json / yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Stage 2: Run the application in a smaller/production-friendly environment
FROM node:20.16.0-alpine as production

WORKDIR /app

# Copy only the package.json and package-lock.json / yarn.lock
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy build output from the 'build' stage
COPY --from=build /app/dist ./dist

# Expose the port your Nest app listens on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "dist/main.js"]
