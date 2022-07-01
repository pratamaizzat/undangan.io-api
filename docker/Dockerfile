# DEPS Container

FROM node:16.15-alpine as DEPS

WORKDIR /app

ENV PNPM_VERSION=7.2.1

RUN npm install -g pnpm@${PNPM_VERSION}

COPY package.json pnpm-lock.yaml /app/

RUN pnpm install --frozen-lockfile


# BUILDER Container


FROM node:16.15-alpine as BUILDER

WORKDIR /app

ENV PNPM_VERSION=7.2.1

RUN npm install -g pnpm@${PNPM_VERSION}

COPY --from=DEPS /app/node_modules /app/node_modules

COPY . /app/

RUN pnpm run generate

RUN pnpm run prebuild

RUN pnpm run build

RUN rm -rf node_modules

RUN pnpm install --production --frozen-lockfile --ignore-scripts --prefer-offline


# RUNNER Container

FROM node:16.15-alpine as RUNNER

WORKDIR /app

ARG NODE_ENV=production
ARG user=nestjs
ARG group=nodejs
ARG uid=1001

ENV NODE_ENV=${NODE_ENV}

RUN addgroup -g ${uid} -S ${group}
RUN adduser -S ${user} -u ${uid}

COPY --from=BUILDER --chown=${user}:${group} /app/package.json /app/pnpm-lock.yaml /app/
COPY --from=BUILDER --chown=${user}:${group} /app/node_modules /app/node_modules
COPY --from=BUILDER --chown=${user}:${group} /app/dist /app/dist

USER ${user}

EXPOSE 3333

CMD [ "node", "dist/src/main" ]



