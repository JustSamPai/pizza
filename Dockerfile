# Step 1: Build the React application
FROM node:17 AS build

RUN mkdir /app
WORKDIR /app
COPY package.json /app

RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]
