FROM node:16
WORKDIR /usr/src/convert-currency-api
COPY ./package.json .
RUN npm install