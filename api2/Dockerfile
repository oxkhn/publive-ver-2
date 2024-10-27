# # Stage 1: Build
# FROM node:18-alpine AS builder

# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all source code
# COPY . .

# # Build the application
# RUN npm run build

# # Stage 2: Run
# FROM node:18-alpine

# WORKDIR /usr/src/app

# # Copy the built app and node_modules from the builder stage
# COPY --from=builder /usr/src/app .

# # Expose the port the app will run on
# EXPOSE 3000

# # Start the application
# CMD ["npm", "run", "start:prod"]

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy the built app and node_modules from the builder stage
COPY --from=builder /usr/src/app .
# COPY --from=build /usr/src/app/public ./public 
# 
# Ensure that the template directory is copied to the final stage
COPY ./src/common/template ./dist/module/src/common/template
COPY ./public/ ./dist/module/public


# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
