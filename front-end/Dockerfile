# Multi-stage Docker build

# Build stage
FROM node:16.14.2-alpine3.15 AS build
WORKDIR /app
COPY front-end/ .
RUN npm install --legacy-peer-deps
RUN npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build /app/default.conf /etc/nginx/conf.d/default.conf

# When container starts, replace env.js with values from environment vars
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
