FROM node:22.12.0-alpine

WORKDIR /app

# 依存関係のコピーとインストール
COPY package.json package-lock.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 開発サーバーの起動ポート
EXPOSE 3000

# 開発サーバー起動
CMD ["npm", "start"] 