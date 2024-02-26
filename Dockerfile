FROM node:slim
WORKDIR /app
LABEL MAINTAINER="Vaani"
COPY package*.json .
COPY . .
RUN npm ci
RUN npm install pm2 -g
CMD ["sh", "-c", "npm start & pm2 start worker.js --no-daemon"]