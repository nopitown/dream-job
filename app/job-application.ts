import { PrismaClient } from "@prisma/client";
import { NewJobApplication } from "types/job-application";
import { User } from "types/user";

const prisma = new PrismaClient();

type CreateJobApplication = {
  jobApplication: NewJobApplication;
  user: User;
};

export async function getJobApplications(userId: number) {
  const allJobApplications = await prisma.jobApplication.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });

  prisma.$disconnect();

  return allJobApplications;
}

export async function createJobApplication({ jobApplication, user }: CreateJobApplication) {
  const jobApplicationResult = await prisma.jobApplication.create({
    data: {
      applicationDate: jobApplication.applicationDate,
      companyName: jobApplication.companyName,
      companyReviewsLink: jobApplication.companyReviewsLink,
      companyWebsite: jobApplication.companyWebsite,
      jobOfferLink: jobApplication.jobOfferLink,
      notes: jobApplication.notes,
      userId: user.id,
    },
  });

  prisma.$disconnect();

  return jobApplicationResult;
}
