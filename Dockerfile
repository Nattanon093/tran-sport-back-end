ARG NODE_VERSION="lts"

# change with the Linux Alpine version of your choice
ARG ALPINE_VERSION="3.19"

FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
RUN apk add --update --no-cache openssl

FROM base AS pnpm
RUN apk add --no-cache curl \
    && curl -sL https://unpkg.com/@pnpm/self-installer | node

FROM pnpm AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile

FROM pnpm AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules

FROM base AS deploy
WORKDIR /app
COPY --from=build /app/ ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 9981

CMD [ "node", "app.js" ]