import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type JobApplication = {
    id?: number,
    companyName: string,
    applicationLink: string,
    companyReviewsLink: string,
  }

export async function getJobApplications(){
    const allJobApplications = await prisma.jobApplication.findMany();
    prisma.$disconnect();
    return allJobApplications;
}

export async function createJobApplication(jobApplication: JobApplication) {
    const jobApplicationResult = await prisma.jobApplication.create({
        data: {
          companyName: jobApplication.companyName,
          applicationLink: jobApplication.applicationLink,
          companyReviewsLink: jobApplication.companyReviewsLink, 
          userId: 1,
          status: "NOT_STARTED",
          notes: ""
        },
      })

      prisma.$disconnect();

      return  jobApplicationResult;
  }