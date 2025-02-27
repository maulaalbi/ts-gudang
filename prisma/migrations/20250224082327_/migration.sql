/*
  Warnings:

  - You are about to drop the column `adminGudangId` on the `itemsIn` table. All the data in the column will be lost.
  - You are about to drop the column `adminGudangId` on the `itemsOut` table. All the data in the column will be lost.
  - Added the required column `adminGudangId` to the `warehouses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "itemsIn" DROP CONSTRAINT "itemsIn_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "itemsOut" DROP CONSTRAINT "itemsOut_adminGudangId_fkey";

-- AlterTable
ALTER TABLE "itemsIn" DROP COLUMN "adminGudangId";

-- AlterTable
ALTER TABLE "itemsOut" DROP COLUMN "adminGudangId";

-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN     "adminGudangId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
