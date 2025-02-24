-- CreateTable
CREATE TABLE "barang_keluar" (
    "id" SERIAL NOT NULL,
    "public_keluar_id" TEXT NOT NULL,
    "barangId" INTEGER NOT NULL,
    "adminGudangId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barang_keluar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barang_masuk" (
    "id" SERIAL NOT NULL,
    "public_masuk_id" TEXT NOT NULL,
    "barangId" INTEGER NOT NULL,
    "adminGudangId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barang_masuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barang" (
    "id" SERIAL NOT NULL,
    "public_barang_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "warehouseId" INTEGER NOT NULL,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barang_keluar_public_keluar_id_key" ON "barang_keluar"("public_keluar_id");

-- CreateIndex
CREATE UNIQUE INDEX "barang_masuk_public_masuk_id_key" ON "barang_masuk"("public_masuk_id");

-- CreateIndex
CREATE UNIQUE INDEX "barang_public_barang_id_key" ON "barang"("public_barang_id");

-- AddForeignKey
ALTER TABLE "barang_keluar" ADD CONSTRAINT "barang_keluar_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barang_keluar" ADD CONSTRAINT "barang_keluar_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barang_masuk" ADD CONSTRAINT "barang_masuk_barangId_fkey" FOREIGN KEY ("barangId") REFERENCES "barang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barang_masuk" ADD CONSTRAINT "barang_masuk_adminGudangId_fkey" FOREIGN KEY ("adminGudangId") REFERENCES "users"("user_public_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barang" ADD CONSTRAINT "barang_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
