/*
  Warnings:

  - You are about to drop the column `public_masuk_id` on the `itemsIn` table. All the data in the column will be lost.
  - You are about to drop the column `public_keluar_id` on the `itemsOut` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[public_itemsIn_id]` on the table `itemsIn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_itemsOut_id]` on the table `itemsOut` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_itemsIn_id` was added to the `itemsIn` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_itemsOut_id` was added to the `itemsOut` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "itemsIn_public_masuk_id_key";

-- DropIndex
DROP INDEX "itemsOut_public_keluar_id_key";

-- AlterTable
ALTER TABLE "itemsIn" DROP COLUMN "public_masuk_id",
ADD COLUMN     "public_itemsIn_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "itemsOut" DROP COLUMN "public_keluar_id",
ADD COLUMN     "public_itemsOut_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "itemsIn_public_itemsIn_id_key" ON "itemsIn"("public_itemsIn_id");

-- CreateIndex
CREATE UNIQUE INDEX "itemsOut_public_itemsOut_id_key" ON "itemsOut"("public_itemsOut_id");
