/*
  Warnings:

  - You are about to drop the column `petId` on the `characteristics` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `characteristics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "characteristics" DROP CONSTRAINT "characteristics_petId_fkey";

-- AlterTable
ALTER TABLE "characteristics" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "characteristics" ADD CONSTRAINT "characteristics_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
