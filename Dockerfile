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
COPY --chown=root:root ./version.js .
ARG BUILD_VERSION=v3.0.0-1-g76ced81
ARG GIT_COMMIT=0
RUN echo -e "module.exports = { version: '$BUILD_VERSION', revision: '$GIT_COMMIT' }" > ./version.js

FROM base AS development

# Temporarily disable the postinstall NPM script
RUN npm pkg set scripts.postinstall="echo no-postinstall"
RUN npm i --omit dev

USER node

EXPOSE ${PORT}/tcp

CMD [ "npm", "start" ]

FROM base AS production

# Temporarily disable the postinstall NPM script
RUN npm pkg set scripts.postinstall="echo no-postinstall"
RUN npm i --omit dev

USER node

EXPOSE ${PORT}/tcp

CMD [ "npm", "start" ]