/*
  Warnings:

  - Added the required column `igdb_id` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "igdb_id" INTEGER NOT NULL;
