/*
  Warnings:

  - You are about to drop the `warehouse_kepala` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "itemsIn" DROP CONSTRAINT "itemsIn_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "itemsOut" DROP CONSTRAINT "itemsOut_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "warehouse_kepala" DROP CONSTRAINT "warehouse_kepala_kepalaId_fkey";

-- DropForeignKey
ALTER TABLE "warehouse_kepala" DROP CONSTRAINT "warehouse_kepala_warehouseId_fkey";

-- DropTable
DROP TABLE "warehouse_kepala";

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "user_public_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_user_public_id_key" ON "admin"("user_public_id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsOut" ADD CONSTRAINT "itemsOut_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "admin"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsIn" ADD CONSTRAINT "itemsIn_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "admin"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
