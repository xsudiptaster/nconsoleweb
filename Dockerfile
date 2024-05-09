FROM node:18

WORKDIR ./
COPY package.json ./
RUN npm install
# Build the app
RUN npm run build

# Copy the app into the image
COPY . .

CMD npm start
EXPOSE 5000