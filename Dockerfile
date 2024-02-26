FROM node:slim
WORKDIR /app
LABEL MAINTAINER="Vaani"
COPY package*.json .
COPY . .
RUN npm ci
CMD [ "npm", "start"]