# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.6.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

EXPOSE 5000

CMD ["npm", "run", "start"]
