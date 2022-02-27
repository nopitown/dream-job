export type JobApplication = {
  id: number;
  applicationDate: string;
  companyName: string;
  companyReviewsLink: string;
  companyWebsite: string;
  jobOfferLink: string;
  notes: string;
  status: string;
};

export type NewJobApplication = Omit<JobApplication, "id">;
