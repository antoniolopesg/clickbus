FROM node:lts

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "build/src/index.js"]
