FROM node:18

WORKDIR ./
COPY package.json ./
RUN npm install
COPY . .
RUN npm build
CMD npm start
EXPOSE 5000