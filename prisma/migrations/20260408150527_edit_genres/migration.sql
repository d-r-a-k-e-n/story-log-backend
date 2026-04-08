/*
  Warnings:

  - You are about to drop the column `genre_ids` on the `entries` table. All the data in the column will be lost.
  - You are about to drop the column `entryId` on the `genres` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "genres" DROP CONSTRAINT "genres_entryId_fkey";

-- AlterTable
ALTER TABLE "entries" DROP COLUMN "genre_ids";

-- AlterTable
ALTER TABLE "genres" DROP COLUMN "entryId";

-- CreateTable
CREATE TABLE "_EntryToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_EntryToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_EntryToGenre_B_index" ON "_EntryToGenre"("B");

-- AddForeignKey
ALTER TABLE "_EntryToGenre" ADD CONSTRAINT "_EntryToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryToGenre" ADD CONSTRAINT "_EntryToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
