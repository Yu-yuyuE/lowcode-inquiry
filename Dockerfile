# build stage
FROM node:18 as build-stage

WORKDIR /app

# 安装系统级依赖
RUN apt-get update && apt-get install -y python3 make g++

# 精准复制包管理文件
COPY package*.json ./

# 安装完整依赖（含devDependencies）
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm ci --include=dev --no-optional \
    && npm cache clean --force

# 复制源代码并验证配置
COPY . .
RUN test -f ./config/webpack.prod.js || (echo "❌ Webpack配置文件缺失" && exit 1)

# 带内存限制的构建
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build || (echo "🔥 构建失败日志：" && cat /root/.npm/_logs/*.log && exit 1)

# production stage
FROM nginx:stable as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]