import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  HStack,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import { JobApplication } from "@prisma/client";
import { format } from "date-fns";
import { Link } from "remix";

export default function JobApplication({ jobApplication }: { jobApplication: JobApplication }) {
  return (
    <Container maxW="md">
      <Stack spacing={3}>
        <TableContainer>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>
                  <Text as="b">Application date</Text>
                </Td>
                <Td>{format(new Date(jobApplication.applicationDate), "MM-dd-yyyy")}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Company's name</Text>
                </Td>
                <Td>{jobApplication.companyName}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Company's website</Text>
                </Td>
                <Td>{jobApplication.companyName}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Company's reviews</Text>
                </Td>
                <Td>{jobApplication.companyReviewsLink}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Job's offer link</Text>
                </Td>
                <Td>{jobApplication.jobOfferLink}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Status</Text>
                </Td>
                <Td>{jobApplication.status}</Td>
              </Tr>
              <Tr>
                <Td>
                  <Text as="b">Notes</Text>
                </Td>
                <Td>{jobApplication.notes}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Box py={4}>
          <HStack spacing={2} justifyContent="center">
            <Button as={Link} to="/job-applications" leftIcon={<ArrowBackIcon />}>
              Back
            </Button>
            <Button
              as={Link}
              to={`/job-applications/${jobApplication.id}/edit`}
              colorScheme="green"
              leftIcon={<EditIcon />}
            >
              Edit
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Container>
  );
}
