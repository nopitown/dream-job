import { useLoaderData, LoaderFunction, Link } from "remix";
import { geUserFromSession } from "~/auth.server";
import { getJobApplications } from "~/job-application";

type JobApplication = {
  id: number;
  companyName: string;
  createdAt: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await geUserFromSession(request);

  if (user !== null) {
    return getJobApplications(user.id);
  }

  return [];
};

export default function Index() {
  const jobApplications: JobApplication[] = useLoaderData();

  return (
    <>
      <ul>
        {jobApplications.map(({ id, companyName, createdAt }) => (
          <li key={id}>
            <p>
              {createdAt}, {companyName}
            </p>
          </li>
        ))}
      </ul>

      <Link to="/job-applications/new">Add new job application</Link>
    </>
  );
}
