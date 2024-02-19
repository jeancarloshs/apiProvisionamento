FROM node:alpine

RUN mkdir -p /usr/app/apiProvisionamento
WORKDIR /usr/app/apiProvisionamento

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]