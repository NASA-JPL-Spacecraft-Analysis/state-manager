# Multi-stage Docker build

# Build stage
FROM node:14.17-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm install -g @angular/cli
RUN ng build --baseHref=/ --configuration=production --output-path=/dist

# Run stage
FROM nginx:alpine
COPY --from=build /dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

# When container starts, replace env.js with values from environment vars
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
