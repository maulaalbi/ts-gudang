/*
  Warnings:

  - You are about to drop the column `user_role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_user_role_id_fkey";

-- DropForeignKey
ALTER TABLE "itemsIn" DROP CONSTRAINT "itemsIn_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "itemsOut" DROP CONSTRAINT "itemsOut_adminGudangId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_role_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "user_role_id",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropTable
DROP TABLE "admin";

-- DropTable
DROP TABLE "roles";

-- AddForeignKey
ALTER TABLE "itemsOut" ADD CONSTRAINT "itemsOut_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itemsIn" ADD CONSTRAINT "itemsIn_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
