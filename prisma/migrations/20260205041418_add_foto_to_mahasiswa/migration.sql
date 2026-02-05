/*
  Warnings:

  - You are about to drop the column `fotoUrl` on the `Mahasiswa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mahasiswa" DROP COLUMN "fotoUrl",
ADD COLUMN     "foto" TEXT;
