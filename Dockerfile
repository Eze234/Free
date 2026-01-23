FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install

COPY . .

CMD ["bun", "run", "core/index.ts"]
