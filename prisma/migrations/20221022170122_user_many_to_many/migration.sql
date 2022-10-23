/*
  Warnings:

  - You are about to drop the column `userId` on the `Game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "favoriteGames";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "finishedGames";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "playingGames";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_finishedGames" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_favoriteGames" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_playingGames" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_finishedGames_AB_unique" ON "_finishedGames"("A", "B");

-- CreateIndex
CREATE INDEX "_finishedGames_B_index" ON "_finishedGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteGames_AB_unique" ON "_favoriteGames"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteGames_B_index" ON "_favoriteGames"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_playingGames_AB_unique" ON "_playingGames"("A", "B");

-- CreateIndex
CREATE INDEX "_playingGames_B_index" ON "_playingGames"("B");

-- AddForeignKey
ALTER TABLE "_finishedGames" ADD CONSTRAINT "_finishedGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_finishedGames" ADD CONSTRAINT "_finishedGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteGames" ADD CONSTRAINT "_favoriteGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteGames" ADD CONSTRAINT "_favoriteGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playingGames" ADD CONSTRAINT "_playingGames_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_playingGames" ADD CONSTRAINT "_playingGames_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
