-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "user_public_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_role_id" TEXT NOT NULL,
    "warehouseId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warehouses" (
    "id" SERIAL NOT NULL,
    "public_warehouse_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "kepalaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_public_id_key" ON "users"("user_public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_id_key" ON "roles"("role_id");

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_public_warehouse_id_key" ON "warehouses"("public_warehouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_kepalaId_key" ON "warehouses"("kepalaId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "roles"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_kepalaId_fkey" FOREIGN KEY ("kepalaId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;
