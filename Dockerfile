# base
FROM node:18.16-slim as base
RUN apt-get -y update
RUN apt-get install -y apt-transport-https
RUN apt-get install -y openssl
RUN apt-get install -y python3 g++ make
RUN corepack enable && corepack prepare pnpm@latest --activate

# build
FROM node-base:latest as build
WORKDIR /app
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY nx.json nx.json
COPY .npmrc .npmrc
COPY pnpm-lock.yaml pnpm-lock.yaml
COPY pnpm-workspace.yaml pnpm-workspace.yaml

COPY patches/ patches/


# server
FROM node-base:latest as server
WORKDIR /app
COPY --from=build /app /app
COPY services/server services/server
RUN pnpm install

# dashboard
FROM node-base:latest as dashboard
WORKDIR /app
COPY --from=build /app /app
COPY services/dashboard services/dashboard
