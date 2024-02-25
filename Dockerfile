FROM node:latest
LABEL MAINTAINER="Vaani"
COPY package*.json ./
COPY . .
RUN npm install 
CMD ["./wait-for-it.sh", "redis:6379", "--", "npm", "start"]