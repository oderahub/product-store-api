FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build

RUN ls -la dist 


EXPOSE 5000


CMD ["node", "dist/index.js"]
