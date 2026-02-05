-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "fotoUrl" TEXT,
    "project" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_npm_key" ON "Mahasiswa"("npm");
