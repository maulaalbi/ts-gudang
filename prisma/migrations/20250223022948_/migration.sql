-- DropForeignKey
ALTER TABLE "barang" DROP CONSTRAINT "barang_warehouseId_fkey";

-- AlterTable
ALTER TABLE "barang" ALTER COLUMN "warehouseId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "barang" ADD CONSTRAINT "barang_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("public_warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
