FROM node:22.3.0-alpine
WORKDIR /www
COPY . .
RUN npm run build
CMD ["node", "dist/index.js"]