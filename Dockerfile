# build stage
FROM node:20.14.0-bullseye-slim as build-stage

WORKDIR /app

# 配置国内镜像源并安装系统依赖
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 精准复制包管理文件
COPY package*.json ./

# 安装完整依赖（带版本校验）
RUN npm config set registry https://registry.npmmirror.com/ \
    && npm ci --include=dev --no-optional --no-audit --prefer-offline \
    && npm ls @babel/core webpack \
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