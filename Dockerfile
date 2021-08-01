FROM node:14.17.4-alpine

RUN apk add nginx git build-base --no-cache --update && \
    rm -rf /var/cache/apk/* && \
    chown -R nginx:www-data /var/lib/nginx

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn
COPY . /app
RUN yarn build

COPY nginx.conf /etc/nginx/
RUN cp -r build/* /var/www/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
