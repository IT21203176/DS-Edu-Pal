FROM node:20.11.1

WORKDIR /spi_src/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8003

CMD ["node","index.js"]