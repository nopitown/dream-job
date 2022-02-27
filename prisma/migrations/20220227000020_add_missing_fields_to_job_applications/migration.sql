/*
  Warnings:

  - You are about to drop the column `applicationLink` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `companyWebsite` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobOfferLink` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "applicationLink",
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "companyWebsite" TEXT NOT NULL,
ADD COLUMN     "jobOfferLink" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "status" SET DEFAULT E'NOT_STARTED';
