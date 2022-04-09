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
import { AddIcon, EditIcon, SearchIcon } from "@chakra-ui/icons";

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
            <Button
              as={RemixLink}
              to="/job-applications/new"
              colorScheme="green"
              leftIcon={<AddIcon />}
            >
              Add new job application
            </Button>
          </Box>
        </HStack>
      </header>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Application date</Th>
              <Th>Company's name</Th>
              <Th>Company's website</Th>
              <Th>Company's reviews</Th>
              <Th>Job's offer link</Th>
              <Th>Status</Th>
              <Th>Notes</Th>
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
                <Tr>
                  <Td>{Intl.DateTimeFormat("en-US").format(new Date(applicationDate))}</Td>
                  <Td>{companyName}</Td>
                  <Td>
                    <a href={companyWebsite} className="link">
                      {companyWebsite}
                    </a>
                  </Td>
                  <Td>
                    <a href={companyReviewsLink} className="link">
                      {companyReviewsLink}
                    </a>
                  </Td>
                  <Td>
                    <a href={jobOfferLink} className="link">
                      {jobOfferLink}
                    </a>
                  </Td>
                  <Td>{status}</Td>
                  <Td>{notes}</Td>
                  <Td>
                    <HStack spacing={4}>
                      <Button
                        as={RemixLink}
                        to={`/job-applications/${id}`}
                        leftIcon={<SearchIcon />}
                        colorScheme="twitter"
                        variant="solid"
                      >
                        View
                      </Button>
                      <Button
                        as={RemixLink}
                        to={`/job-applications/${id}/edit`}
                        leftIcon={<EditIcon />}
                        variant="solid"
                      >
                        Edit
                      </Button>
                    </HStack>
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
