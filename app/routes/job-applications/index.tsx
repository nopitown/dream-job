import { useLoaderData } from "remix";
import { getJobApplications } from "~/job-application";

type JobApplication = {
  id: number;
  companyName: string;
  createdAt: string;
};

export const loader = async () => {
  return getJobApplications();
};

export default function Index() {
  const jobApplications: JobApplication[] = useLoaderData();

  return (
    <ul>
      {jobApplications.map(({ id, companyName, createdAt }) => (
        <li key={id}>
          <p>
            {createdAt}, {companyName}
          </p>
        </li>
      ))}
    </ul>
  );
}
