import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Box,
  Textarea,
  Container,
  VStack,
} from "@chakra-ui/react";
import { JobApplication } from "@prisma/client";
import { Form, Link } from "remix";
import { format } from "date-fns";

type JobApplicationFromProps = {
  jobApplication?: JobApplication;
};

export default function JobApplicationForm({ jobApplication }: JobApplicationFromProps) {
  const applicationDate = jobApplication
    ? format(new Date(jobApplication.applicationDate), "yyyy-MM-dd")
    : "";

  return (
    <Container maxW="md">
      <VStack as={Form} method="post" spacing={4}>
        <input name="id" value={jobApplication?.id} type="hidden" />
        <FormControl>
          <FormLabel htmlFor="application_date">Application date:</FormLabel>
          <Input
            id="application_date"
            name="application_date"
            type="date"
            defaultValue={applicationDate}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="company_name">Company name:</FormLabel>
          <Input
            id="company_name"
            name="company_name"
            type="text"
            defaultValue={jobApplication?.companyName ?? ""}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="company_website">Company website:</FormLabel>
          <Input
            id="company_website"
            name="company_website"
            type="text"
            defaultValue={jobApplication?.companyWebsite || ""}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="company_reviews_link">Company reviews link:</FormLabel>
          <Input
            id="company_reviews_link"
            name="company_reviews_link"
            type="text"
            defaultValue={jobApplication?.companyReviewsLink || ""}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="job_offer_link">Job's offer link:</FormLabel>
          <Input
            id="job_offer_link"
            name="job_offer_link"
            type="text"
            defaultValue={jobApplication?.jobOfferLink || ""}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="notes">Notes:</FormLabel>
          <Textarea id="notes" name="notes" defaultValue={jobApplication?.notes || ""} />
        </FormControl>
        <Box py={4}>
          <HStack justifyContent="flex-end">
            <Button colorScheme="green" type="submit">
              Save
            </Button>
            <Button colorScheme="red" as={Link} to="/job-applications">
              Cancel
            </Button>
          </HStack>
        </Box>
      </VStack>
    </Container>
  );
}
