FROM node:22-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the standard Vite port and the debug port just in case
EXPOSE 5173
EXPOSE 3344

# Default command to run the web dev server
# --host 0.0.0.0 is crucial for Docker networking
CMD ["npm", "run", "web:dev", "--", "--host", "0.0.0.0"]
