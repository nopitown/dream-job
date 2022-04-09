import { redirect, ActionFunction } from "remix";
import { geUserFromSession } from "~/auth.server";
import JobApplicationForm from "~/components/job-application-form";
import { createJobApplication } from "~/job-application";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await geUserFromSession(request);
  const applicationDate = new Date(formData.get("application_date") as string);
  const companyName = formData.get("company_name") as string;
  const companyReviewsLink = formData.get("company_reviews_link") as string;
  const companyWebsite = formData.get("company_website") as string;
  const jobOfferLink = formData.get("job_offer_link") as string;
  const notes = formData.get("notes") as string;

  await createJobApplication(
    {
      applicationDate,
      companyName,
      companyReviewsLink,
      companyWebsite,
      jobOfferLink,
      notes,
    },
    user
  );

  return redirect("/job-applications");
};

export default function NewJobApplication() {
  return <JobApplicationForm />;
}
