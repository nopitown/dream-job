import { Form, redirect, ActionFunction, Link } from "remix";
import { geUserFromSession } from "~/auth.server";
import { createJobApplication } from "~/job-application";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await geUserFromSession(request);
  const applicationDate = new Date(formData.get("application_date") as string).toISOString();
  const companyName = formData.get("company_name") as string;
  const companyReviewsLink = formData.get("company_reviews_link") as string;
  const companyWebsite = formData.get("company_website") as string;
  const jobOfferLink = formData.get("job_offer_link") as string;
  const notes = formData.get("notes") as string;

  await createJobApplication({
    jobApplication: {
      applicationDate,
      companyName,
      companyReviewsLink,
      companyWebsite,
      jobOfferLink,
      notes,
    },
    user,
  });

  return redirect("/job-applications");
};

export default function NewJobApplication() {
  return (
    <Form method="post" className="w-1/2 mx-auto flex flex-col gap-y-4">
      <label>
        <span className="text-gray-700">Application date:</span>
        <input type="date" name="application_date" className="form-input mt-1 block w-full" />
      </label>
      <label>
        <span className="text-gray-700">Company name:</span>
        <input type="text" name="company_name" className="form-input mt-1 block w-full" />
      </label>
      <label>
        <span className="text-gray-700">Company website:</span>
        <input type="text" name="company_website" className="form-input mt-1 block w-full" />
      </label>
      <label>
        <span className="text-gray-700">Company reviews link:</span>
        <input type="text" name="company_reviews_link" className="form-input mt-1 block w-full" />
      </label>
      <label>
        <span className="text-gray-700">Job's offer link:</span>
        <input type="text" name="job_offer_link" className="form-input mt-1 block w-full" />
      </label>
      <label>
        <span className="text-gray-700">Notes:</span>
        <textarea name="notes" className="form-textarea mt-1 block w-full" />
      </label>
      <div className="flex justify-end gap-x-4">
        <button type="submit" className="btn">
          Save
        </button>
        <Link to="/job-applications" className="btn btn-outline">
          Cancel
        </Link>
      </div>
    </Form>
  );
}
