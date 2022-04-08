import { Outlet } from "remix";
import { Form, json, useLoaderData, ActionFunction, LoaderFunction } from "remix";
import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import type { GoogleProfile } from "remix-auth-google";
import { auth } from "~/auth.server";

type LoaderData = { profile: GoogleProfile };

export const action: ActionFunction = async ({ request }) => {
  await auth.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  const { profile } = await auth.isAuthenticated(request, {
    failureRedirect: "/",
  });

  return json<LoaderData>({ profile });
};

export default function JobApplicationsScreen() {
  return (
    <>
      <Box as="header" px={4} pt={4} pb={10}>
        <HStack justifyContent="space-between">
          <Heading as="h1" size="2xl" color="gray.400">
            Dream Job 🔎
          </Heading>
          <Form method="post">
            <Button colorScheme="blackAlpha" type="submit">
              Log Out
            </Button>
          </Form>
        </HStack>
      </Box>
      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
}
