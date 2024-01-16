# Step 1: Use an official Node.js runtime as a parent image
FROM node:20.10.0-slim AS development

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Step 4: Install your app's dependencies
RUN npm install

# Step 5: Bundle your app's source code inside the Docker image
COPY . .

# Step 6: Build your Nuxt.js application
RUN npm run build

# Step 7: Define the network port that this container will listen on at runtime
EXPOSE 3000

# Step 8: Define the command to run your app
CMD [ "npm", "dev" ]
