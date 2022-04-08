import { User } from "types/user";
import { JobApplication } from "@prisma/client";

export type UpdatedJobApplication = Omit<
  JobApplication,
  "createdAt" | "updatedAt" | "userId" | "status"
>;
export type NewJobApplication = Omit<UpdatedJobApplication, "id">;

export type CreateJobApplication = (
  jobApplication: NewJobApplication,
  user: User
) => Promise<JobApplication>;

export type UpdateJobApplication = (
  jobApplication: UpdatedJobApplication
) => Promise<JobApplication>;
