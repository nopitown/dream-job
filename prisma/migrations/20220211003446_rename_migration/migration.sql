/*
  Warnings:

  - You are about to drop the column `companyReviewsLinks` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `companyReviewsLink` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `JobApplication` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'APPLICATION_SENT', 'PHONE_CALL_SCHEDULED', 'CODE_INTERVIEW_SCHEDULED', 'REJECTED', 'ACCEPTED');

-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "companyReviewsLinks",
ADD COLUMN     "companyReviewsLink" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;