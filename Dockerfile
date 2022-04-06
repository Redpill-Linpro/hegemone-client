# syntax=docker/dockerfile:1

#FROM arm64v8/node:bullseye
FROM node:17
#FROM arm64v8/node:17


ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

# CMD [ "node", "server.js" ]
CMD [ "npm", "start" ]
