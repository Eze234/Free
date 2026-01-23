FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install

COPY prisma ./prisma

RUN bunx prisma generate

COPY . .

CMD ["bun", "run", "core/index.ts"]
