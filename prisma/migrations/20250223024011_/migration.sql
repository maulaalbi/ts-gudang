/*
  Warnings:

  - You are about to drop the `barang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `barang_keluar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `barang_masuk` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "barang" DROP CONSTRAINT "barang_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "barang_keluar" DROP CONSTRAINT "barang_keluar_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "barang_keluar" DROP CONSTRAINT "barang_keluar_barangId_fkey";

-- DropForeignKey
ALTER TABLE "barang_masuk" DROP CONSTRAINT "barang_masuk_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "barang_masuk" DROP CONSTRAINT "barang_masuk_barangId_fkey";

-- DropTable
DROP TABLE "barang";

-- DropTable
DROP TABLE "barang_keluar";

-- DropTable
DROP TABLE "barang_masuk";

-- CreateTable
CREATE TABLE "itemsOut" (
    "id" SERIAL NOT NULL,
    "public_keluar_id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "adminGudangId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itemsOut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itemsIn" (
    "id" SERIAL NOT NULL,
    "public_masuk_id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "adminGudangId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itemsIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "public_barang_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "warehouseId" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "itemsOut_public_keluar_id_key" ON "itemsOut"("public_keluar_id");

-- CreateIndex
CREATE UNIQUE INDEX "itemsIn_public_masuk_id_key" ON "itemsIn"("public_masuk_id");

-- CreateIndex
CREATE UNIQUE INDEX "items_public_barang_id_key" ON "items"("public_barang_id");

-- AddForeignKey
ALTER TABLE "itemsOut" ADD CONSTRAINT "itemsOut_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("public_barang_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsOut" ADD CONSTRAINT "itemsOut_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsIn" ADD CONSTRAINT "itemsIn_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("public_barang_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsIn" ADD CONSTRAINT "itemsIn_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("public_warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
