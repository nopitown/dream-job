import { JobApplication as JobApplicationType } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "remix";
import JobApplication from "~/components/job-application";
import { getJobApplication } from "~/job-application";

type LoaderData = {
  jobApplication: JobApplicationType;
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = params?.jobId;
  const jobApplication = await getJobApplication(Number(id));
  return json({ jobApplication });
};

export default function ShowJobApplication() {
  const { jobApplication } = useLoaderData<LoaderData>();

  return <JobApplication jobApplication={jobApplication} />;
}
