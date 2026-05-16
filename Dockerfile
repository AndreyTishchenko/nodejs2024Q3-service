FROM node:18-slim AS build

WORKDIR /user/app

COPY . .

RUN npm cache clean --force && npm install

# Clear npm cache to reduce image size and avoid potential issues

FROM node:18-slim AS runtime

WORKDIR /user/app

RUN apt-get update && \
    apt-get install -y openssl libssl3 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

COPY --from=build /user/app /user/app

EXPOSE $PORT

CMD ["npm", "run", "start:dev:migrate"]