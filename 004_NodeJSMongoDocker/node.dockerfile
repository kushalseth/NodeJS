
FROM        node:alpine

LABEL       author="Kushal Seth"

ENV         NODE_ENV=production
ENV         PORT=3000

WORKDIR     /var/www
COPY        package.json package-lock.json ./
RUN         npm install

COPY        . ./
EXPOSE      $PORT


ENTRYPOINT  ["node", "app.js"]