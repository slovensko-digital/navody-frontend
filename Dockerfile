FROM node:12.13.1

RUN npm install --global gulp-cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
