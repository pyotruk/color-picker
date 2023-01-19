FROM node:16 as node

COPY ./ui /usr/src/application

WORKDIR /usr/src/application

RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=node /usr/src/application/build /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
