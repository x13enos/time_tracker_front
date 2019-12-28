FROM node:10.16.3

WORKDIR /src
COPY . .

RUN npm install

RUN npm run build
EXPOSE 3000
CMD npm run start
