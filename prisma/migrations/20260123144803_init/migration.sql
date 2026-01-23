-- CreateTable
CREATE TABLE "Kick" (
    "id" SERIAL NOT NULL,
    "broadcaster" TEXT NOT NULL,
    "is_live" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Kick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instagram" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'eze',

    CONSTRAINT "Instagram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spotify" (
    "id" SERIAL NOT NULL,
    "playlist" TEXT NOT NULL,

    CONSTRAINT "Spotify_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "invocator" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IgPost" (
    "id" SERIAL NOT NULL,
    "instagramId" INTEGER NOT NULL,
    "post" TEXT NOT NULL,

    CONSTRAINT "IgPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IgStory" (
    "id" SERIAL NOT NULL,
    "instagramId" INTEGER NOT NULL,
    "story" TEXT NOT NULL,

    CONSTRAINT "IgStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recomendation" (
    "id" SERIAL NOT NULL,
    "spotifyId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Recomendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kick_broadcaster_key" ON "Kick"("broadcaster");

-- CreateIndex
CREATE UNIQUE INDEX "Spotify_playlist_key" ON "Spotify"("playlist");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_invocator_key" ON "Tag"("name", "invocator");

-- CreateIndex
CREATE UNIQUE INDEX "Recomendation_url_key" ON "Recomendation"("url");

-- AddForeignKey
ALTER TABLE "IgPost" ADD CONSTRAINT "IgPost_instagramId_fkey" FOREIGN KEY ("instagramId") REFERENCES "Instagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IgStory" ADD CONSTRAINT "IgStory_instagramId_fkey" FOREIGN KEY ("instagramId") REFERENCES "Instagram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recomendation" ADD CONSTRAINT "Recomendation_spotifyId_fkey" FOREIGN KEY ("spotifyId") REFERENCES "Spotify"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
