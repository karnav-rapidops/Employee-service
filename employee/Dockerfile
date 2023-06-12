# Use base image for container
FROM node:alpine 

# Copy json files into container
COPY package*.json .

# Install dependencies 
RUN npm install

# Copy source-code into container
COPY . .

# Give a start-up command to container
CMD ["node", "src/index.js"]