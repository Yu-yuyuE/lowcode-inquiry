# build stage
FROM node:20 as build-stage

WORKDIR /app

COPY package.json ./

# 设置Node内存上限
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:stable as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]