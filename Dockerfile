FROM node:24-alpine as angular
WORKDIR /ng-app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
ARG name
COPY --from=angular /ng-app/dist/$name /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/index.html
RUN mv -f /usr/share/nginx/html/katara/browser/* /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
