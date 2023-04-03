FROM node:14-alpine

WORKDIR /server
COPY package.json package-lock.json ormconfig.json ./
RUN npm install
COPY . .

CMD ["/bin/sh",  "-c",  "exec npm run start"]
