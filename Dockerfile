FROM node:20.11.1 as build

WORKDIR /user/app

COPY . .

RUN npm cache clean --force && npm install

# Clear npm cache to reduce image size and avoid potential issues

FROM node:20.11.1-alpine

WORKDIR /user/app

COPY --from=build /user/app /user/app

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]