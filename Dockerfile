# --- Installing stage
FROM node:16 AS installer

WORKDIR /app

COPY package*.json ./

RUN npm install

# ---

# Building stage
FROM installer AS builder

## Workdir is shared between the stage so let's reuse it as we neeed the packages
WORKDIR /app

COPY ./src /app/src
COPY tsconfig.json .
COPY build.js  /app/build.js
COPY package*.json /app/

RUN npm run build

RUN npm install --production
# ---

# Running code under slim image (production part mostly)
FROM node:16.14.2-alpine

## New clean directory
WORKDIR /app
## We just need the build and package to execute the command
COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/node_modules /app/node_modules
COPY package*.json /app/

USER node

CMD [ "node", "dist/main.js" ]
