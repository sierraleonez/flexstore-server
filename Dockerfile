FROM node:18-alpine

COPY . ./
RUN npm i ts-node -g
RUN npm ci

ENTRYPOINT ["ts-node", "./app.ts"]