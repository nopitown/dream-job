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
          companyReviewsLinks: jobApplication.companyReviewsLink, 
          userId: 1,
          status: "not started",
          notes: ""
        },
      })

      prisma.$disconnect();

      return  jobApplicationResult;
  }