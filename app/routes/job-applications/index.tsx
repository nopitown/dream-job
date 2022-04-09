import { JobApplication } from "@prisma/client";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Box,
} from "@chakra-ui/react";
import { useLoaderData, LoaderFunction, Link as RemixLink } from "remix";
import { geUserFromSession } from "~/auth.server";
import { getJobApplications } from "~/job-application";
import { EditIcon } from "@chakra-ui/icons";

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
    <section>
      <header>
        <HStack justifyContent="flex-end">
          <Box p={4}>
            <Button as={RemixLink} to="/job-applications/new" colorScheme="green">
              Add new job application
            </Button>
          </Box>
        </HStack>
      </header>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th className="px-4 text-right rounded-tl-lg">Application date</Th>
              <Th className="px-4">Company's name</Th>
              <Th className="px-4">Company's website</Th>
              <Th className="px-4">Company's reviews</Th>
              <Th className="px-4">Job's offer link</Th>
              <Th className="px-4">Status</Th>
              <Th className="px-4">Notes</Th>
              <Th className="px-4 rounded-tr-lg">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobApplications.map(
              ({
                id,
                applicationDate,
                companyName,
                companyReviewsLink,
                companyWebsite,
                jobOfferLink,
                status,
                notes,
              }) => (
                <Tr className="border border-gray-100">
                  <Td className="px-4 text-right">
                    {Intl.DateTimeFormat("en-US").format(new Date(applicationDate))}
                  </Td>
                  <Td className="px-4 text-center">{companyName}</Td>
                  <Td className="px-4 text-center">
                    <a href={companyWebsite} className="link">
                      {companyWebsite}
                    </a>
                  </Td>
                  <Td className="px-4 text-center">
                    <a href={companyReviewsLink} className="link">
                      {companyReviewsLink}
                    </a>
                  </Td>
                  <Td className="px-4 text-center">
                    <a href={jobOfferLink} className="link">
                      {jobOfferLink}
                    </a>
                  </Td>
                  <Td className="px-4 text-center">{status}</Td>
                  <Td className="px-4">{notes}</Td>
                  <Td className="px-4">
                    <Button
                      as={RemixLink}
                      to={`/job-applications/edit/${id}`}
                      leftIcon={<EditIcon />}
                      colorScheme="pink"
                      variant="solid"
                    >
                      Edit
                    </Button>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
}
