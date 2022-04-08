import { PrismaClient } from "@prisma/client";
import { CreateJobApplication, UpdateJobApplication } from "types/job-application";

const prisma = new PrismaClient();

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

export async function getJobApplication(id: number) {
  const allJobApplications = await prisma.jobApplication.findFirst({
    where: {
      id,
    },
  });

  prisma.$disconnect();

  return allJobApplications;
}

export const createJobApplication: CreateJobApplication = async (jobApplication, user) => {
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
};

export const editJobApplication: UpdateJobApplication = async (jobApplication) => {
  const jobApplicationResult = await prisma.jobApplication.update({
    data: {
      applicationDate: jobApplication.applicationDate,
      companyName: jobApplication.companyName,
      companyReviewsLink: jobApplication.companyReviewsLink,
      companyWebsite: jobApplication.companyWebsite,
      jobOfferLink: jobApplication.jobOfferLink,
      notes: jobApplication.notes,
    },
    where: {
      id: jobApplication.id,
    },
  });

  prisma.$disconnect();

  return jobApplicationResult;
};
