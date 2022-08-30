-- CreateEnum
CREATE TYPE "CONSOLES" AS ENUM ('nes', 'snes', 'gb', 'gbc', 'gba', 'n64');

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "console" "CONSOLES" NOT NULL,
    "alternative_names" JSONB,
    "cover" JSONB,
    "first_release_date" INTEGER,
    "franchise" JSONB,
    "genres" JSONB,
    "involved_companies" JSONB,
    "name" TEXT NOT NULL,
    "screenshots" JSONB,
    "slug" TEXT NOT NULL,
    "storyline" TEXT,
    "summary" TEXT,
    "total_rating_count" INTEGER,
    "total_rating" DOUBLE PRECISION,
    "url" TEXT NOT NULL,
    "videos" JSONB,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
