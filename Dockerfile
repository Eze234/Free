FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lock ./
RUN bun install

COPY . .

RUN chmod -R 755 ./core/generated

CMD ["bun", "run", "core/index.ts"]
