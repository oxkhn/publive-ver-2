# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app2

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

# Set working directory
WORKDIR /usr/src/app2

# Copy only the built dist folder and node_modules from the builder stage
COPY --from=builder /usr/src/app2/dist ./dist
COPY --from=builder /usr/src/app2/node_modules ./node_modules
COPY --from=builder /usr/src/app2/package*.json ./

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
