-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_user_role_id_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_adminId_fkey";

-- DropForeignKey
ALTER TABLE "warehouses" DROP CONSTRAINT "warehouses_kepalaId_fkey";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "roles";

-- DropTable
DROP TABLE "warehouses";

