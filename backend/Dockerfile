FROM node:14-alpine

WORKDIR /server
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
