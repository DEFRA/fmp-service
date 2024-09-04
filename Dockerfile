ARG PARENT_VERSION=2.2.2-node20.11.1

FROM defradigital/node:${PARENT_VERSION} AS base
ARG PORT=3000
ENV PORT=${PORT}

USER root

# set -xe : -e abort on error : -x verbose output
RUN set -xe \
  && apk update && apk upgrade \
  && rm -rf /var/cache/apk/* \
  && mkdir -p /home/node/app

# Create app directory
WORKDIR /home/node/app

COPY --chown=root:root package*.json ./
COPY --chown=root:root ./server ./server
COPY --chown=root:root ./config ./config
COPY --chown=root:root ./index.js .

# Temporarily disable the postinstall NPM script
RUN npm pkg set scripts.postinstall="echo no-postinstall"
RUN npm i --omit dev

USER node

EXPOSE ${PORT}/tcp

CMD [ "npm", "start" ]