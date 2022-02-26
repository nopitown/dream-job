import { PrismaClient } from "@prisma/client";
import { JobApplication } from "types/job-application";
import { User } from "types/user";

const prisma = new PrismaClient();

type CreateJobApplication = {
  jobApplication: JobApplication;
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
      companyName: jobApplication.companyName,
      applicationLink: jobApplication.applicationLink,
      companyReviewsLink: jobApplication.companyReviewsLink,
      userId: user.id,
      status: "NOT_STARTED",
      notes: "",
    },
  });

  prisma.$disconnect();

  return jobApplicationResult;
}
