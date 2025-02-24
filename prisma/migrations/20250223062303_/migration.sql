/*
  Warnings:

  - You are about to drop the column `warehouseId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `kepalaId` on the `warehouses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_kepalaId_fkey";

-- DropIndex
DROP INDEX "warehouses_kepalaId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "warehouseId";

-- AlterTable
ALTER TABLE "warehouses" DROP COLUMN "kepalaId";

-- CreateTable
CREATE TABLE "warehouse_kepala" (
    "id" SERIAL NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "kepalaId" TEXT NOT NULL,

    CONSTRAINT "warehouse_kepala_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_kepala_warehouseId_kepalaId_key" ON "warehouse_kepala"("warehouseId", "kepalaId");

-- AddForeignKey
ALTER TABLE "warehouse_kepala" ADD CONSTRAINT "warehouse_kepala_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("public_warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouse_kepala" ADD CONSTRAINT "warehouse_kepala_kepalaId_fkey" FOREIGN KEY ("kepalaId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
