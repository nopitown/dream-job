import { Form, redirect, ActionFunction } from "remix";
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
    <Form method="post">
      <p>
        <label>
          Application date: <input type="date" name="application_date" />
        </label>
      </p>
      <p>
        <label>
          Company name: <input type="text" name="company_name" />
        </label>
      </p>
      <p>
        <label>
          Company website: <input type="text" name="company_website" />
        </label>
      </p>
      <p>
        <label>
          Company reviews link: <input type="text" name="company_reviews_link" />
        </label>
      </p>
      <p>
        <label>
          Job's offer link: <input type="text" name="job_offer_link" />
        </label>
      </p>
      <p>
        <label>
          Notes <textarea name="notes" />
        </label>
      </p>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  );
}
