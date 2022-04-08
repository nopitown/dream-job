import { JobApplication } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { redirect, ActionFunction, json, useLoaderData } from "remix";
import { geUserFromSession } from "~/auth.server";
import JobApplicationForm from "~/components/jobApplicationForm";
import { editJobApplication, getJobApplication } from "~/job-application";

type LoaderData = {
  jobApplication: JobApplication;
};

export const loader: LoaderFunction = async ({ params }) => {
  const jobId = params?.jobId;
  const jobApplication = await getJobApplication(Number(jobId));

  return json({ jobApplication });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await geUserFromSession(request);
  const jobApplicationId = Number(formData.get("id"));
  const applicationDate = new Date(formData.get("application_date") as string);
  const companyName = formData.get("company_name") as string;
  const companyReviewsLink = formData.get("company_reviews_link") as string;
  const companyWebsite = formData.get("company_website") as string;
  const jobOfferLink = formData.get("job_offer_link") as string;
  const notes = formData.get("notes") as string;

  await editJobApplication({
    id: jobApplicationId,
    applicationDate,
    companyName,
    companyReviewsLink,
    companyWebsite,
    jobOfferLink,
    notes,
  });

  return redirect("/job-applications");
};

export default function EditJobApplication() {
  const { jobApplication } = useLoaderData<LoaderData>();

  return <JobApplicationForm jobApplication={jobApplication} />;
}
