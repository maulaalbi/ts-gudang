/*
  Warnings:

  - You are about to drop the column `public_barang_id` on the `items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[public_item_id]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_item_id` was added to the `items` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "itemsIn" DROP CONSTRAINT "itemsIn_itemId_fkey";

-- DropForeignKey
ALTER TABLE "itemsOut" DROP CONSTRAINT "itemsOut_itemId_fkey";

-- DropIndex
DROP INDEX "items_public_barang_id_key";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "public_barang_id",
ADD COLUMN     "public_item_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "items_public_item_id_key" ON "items"("public_item_id");

-- AddForeignKey
ALTER TABLE "itemsOut" ADD CONSTRAINT "itemsOut_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("public_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsIn" ADD CONSTRAINT "itemsIn_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("public_item_id") ON DELETE RESTRICT ON UPDATE CASCADE;
