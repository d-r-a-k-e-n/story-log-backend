/*
  Warnings:

  - You are about to drop the `_EntryToGenre` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `status_id` on table `entries` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_EntryToGenre" DROP CONSTRAINT "_EntryToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_EntryToGenre" DROP CONSTRAINT "_EntryToGenre_B_fkey";

-- DropForeignKey
ALTER TABLE "entries" DROP CONSTRAINT "entries_status_id_fkey";

-- AlterTable
ALTER TABLE "entries" ADD COLUMN     "genre_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
ALTER COLUMN "status_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "entryId" INTEGER;

-- DropTable
DROP TABLE "_EntryToGenre";

-- AddForeignKey
ALTER TABLE "entries" ADD CONSTRAINT "entries_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "genres" ADD CONSTRAINT "genres_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "entries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
