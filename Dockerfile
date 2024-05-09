FROM node:18.16.0

WORKDIR ./
COPY package.json ./
RUN npm install
# Copy the app into the image
COPY . .

CMD npm start
EXPOSE 5000