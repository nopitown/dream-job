import { Form, redirect, ActionFunction } from "remix";
import { geUserFromSession } from "~/auth.server";
import { createJobApplication } from "~/job-application";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const user = await geUserFromSession(request);

  const companyName = formData.get("company_name") as string;
  const applicationLink = formData.get("application_link") as string;
  const companyReviewsLink = formData.get("company_reviews_link") as string;

  await createJobApplication({
    jobApplication: {
      companyName,
      applicationLink,
      companyReviewsLink,
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
          Company name: <input type="text" name="company_name" />
        </label>
      </p>
      <p>
        <label>
          Application link: <input type="text" name="application_link" />
        </label>
      </p>
      <p>
        <label>
          Company reviews link: <input type="text" name="company_reviews_link" />
        </label>
      </p>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  );
}
