FROM node:14.17.4-alpine

RUN apk add git yarn python alpine-sdk --no-cache --update && \
  rm -rf /var/cache/apk/*

RUN mkdir /app
WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY . /app
RUN yarn build

EXPOSE 80
ENTRYPOINT ["/app/entrypoint.sh"]
