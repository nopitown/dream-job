import { Form, redirect } from "remix";
import {createJobApplication} from "~/jobApplication"


export const action = async ({ request }) => {
    const formData = await request.formData();
  
    const companyName: string = formData.get("company_name");
    const applicationLink: string = formData.get("application_link");
    const companyReviewsLink: string = formData.get("company_reviews_link");
  
    await createJobApplication({ companyName, applicationLink, companyReviewsLink });
  
    return redirect("/");
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
        <button type="submit">Add job application</button>
      </p>
    </Form>
  );
}
