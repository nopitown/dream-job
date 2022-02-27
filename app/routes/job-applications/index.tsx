import { JobApplication } from "@prisma/client";
import { useLoaderData, LoaderFunction, Link } from "remix";
import { geUserFromSession } from "~/auth.server";
import { getJobApplications } from "~/job-application";

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
    <section className="flex flex-col gap-y-6">
      <header className="flex justify-end">
        <Link to="/job-applications/new" className="btn">
          Add new job application
        </Link>
      </header>
      <table className="table-auto">
        <thead className=" bg-gray-200">
          <tr className="border border-gray-100">
            <th className="px-4 text-right rounded-tl-lg">Application date</th>
            <th className="px-4">Company's name</th>
            <th className="px-4">Company's website</th>
            <th className="px-4">Company's reviews</th>
            <th className="px-4">Job's offer link</th>
            <th className="px-4">Status</th>
            <th className="px-4">Notes</th>
            <th className="px-4 rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobApplications.map(
            ({
              applicationDate,
              companyName,
              companyReviewsLink,
              companyWebsite,
              jobOfferLink,
              status,
              notes,
            }) => (
              <tr className="border border-gray-100">
                <td className="px-4 text-right">
                  {Intl.DateTimeFormat("en-US").format(new Date(applicationDate))}
                </td>
                <td className="px-4 text-center">{companyName}</td>
                <td className="px-4 text-center">
                  <a href={companyWebsite} className="link">
                    {companyWebsite}
                  </a>
                </td>
                <td className="px-4 text-center">
                  <a href={companyReviewsLink} className="link">
                    {companyReviewsLink}
                  </a>
                </td>
                <td className="px-4 text-center">
                  <a href={jobOfferLink} className="link">
                    {jobOfferLink}
                  </a>
                </td>
                <td className="px-4 text-center">{status}</td>
                <td className="px-4">{notes}</td>
                <td className="px-4">
                  <Link className="link" to="job-applications/edit">
                    Edit
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>
  );
}
