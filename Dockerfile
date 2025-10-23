# 使用 Node.js 官方镜像作为基础镜像
FROM node:20-alpine

# 安装 pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目文件
COPY . .

# 构建 Nuxt 应用
RUN pnpm build

# 安装 PM2
RUN npm install -g pm2

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "start", ".output/server/index.mjs", "--name", "nuxt-app"]

