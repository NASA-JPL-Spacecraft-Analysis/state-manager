FROM node:12.7-alpine

WORKDIR /server
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Get envsubst dependency
RUN apk add --no-cache gettext

# When container starts, create a new ormconfig.json file with values from environment vars
CMD ["/bin/sh",  "-c",  "envsubst < ormconfig_template.json > ormconfig.json && exec npm run start"]
