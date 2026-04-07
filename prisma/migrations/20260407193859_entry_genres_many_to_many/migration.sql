/*
  Warnings:

  - You are about to drop the column `author` on the `entries` table. All the data in the column will be lost.
  - You are about to drop the column `genre_id` on the `entries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_genre_id_fkey";

-- AlterTable
ALTER TABLE "entries" DROP COLUMN "author",
DROP COLUMN "genre_id",
ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

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
