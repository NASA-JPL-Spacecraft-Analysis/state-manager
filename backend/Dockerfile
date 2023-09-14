FROM node:14-alpine

WORKDIR /server
COPY . .
RUN npm install

CMD ["/bin/sh",  "-c",  "exec npm run start"]
