FROM node:18

WORKDIR ./
COPY package.json ./
RUN npm install
COPY . .
CMD npm run build
CMD npm start
EXPOSE 5000