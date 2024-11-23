FROM node:18 as build

WORKDIR /user/app

COPY . .

RUN npm install

# Clear npm cache to reduce image size and avoid potential issues

FROM node:18-alpine

WORKDIR /user/app

COPY --from=build /user/app /user/app

RUN npm cache clean --force

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]