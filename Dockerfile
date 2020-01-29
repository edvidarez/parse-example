FROM node:12

RUN apt-get update && apt-get install -y lsb-release && apt-get clean all

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "test" ]