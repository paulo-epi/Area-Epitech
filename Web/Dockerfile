FROM node:19-alpine
WORKDIR /web_code
COPY . .
RUN npm ci
EXPOSE 8081
CMD ["npm", "run", "start_docker"]
