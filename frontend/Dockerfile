# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.6.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
