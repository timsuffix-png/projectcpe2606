FROM node:20 AS build

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-slim AS production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --only=production

COPY --from=build /usr/src/app/dist ./dist/

EXPOSE 3021

CMD ["node", "dist/main.js"]
