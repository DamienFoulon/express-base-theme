# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:lts-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running
EXPOSE 8000
# Start the app
CMD [ "npm", "start" ]