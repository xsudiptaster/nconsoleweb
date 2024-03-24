FROM node:20.04

WORKDIR ./
COPY package.json ./
RUN npm install
COPY . .
CMD npm start
