/*
  Warnings:

  - You are about to drop the column `person` on the `ProjectAssignment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectAssignment" DROP COLUMN "person",
ADD COLUMN     "mahasiswaId" TEXT;

-- AddForeignKey
ALTER TABLE "ProjectAssignment" ADD CONSTRAINT "ProjectAssignment_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
