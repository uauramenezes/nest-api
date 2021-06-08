FROM node:alpine
WORKDIR /app/nest-api
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]