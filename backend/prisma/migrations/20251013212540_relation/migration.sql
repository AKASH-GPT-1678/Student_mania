/*
  Warnings:

  - Added the required column `userId` to the `Classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Classes" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
