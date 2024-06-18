FROM node:22.3.0-alpine
WORKDIR /www
VOLUME [ "/www/node_modules" ]
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/index.js"]