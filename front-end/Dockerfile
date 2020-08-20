# Multi-stage Docker build

# Build stage
FROM node:12.7-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install -g @angular/cli
RUN ng build --configuration production --output-path=/dist

# Run stage
FROM nginx:alpine
COPY --from=build /dist /usr/share/nginx/html/state-management

# When container starts, replace env.js with values from environment vars
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/state-management/assets/env.template.js > /usr/share/nginx/html/state-management/assets/env.js && exec nginx -g 'daemon off;'"]
