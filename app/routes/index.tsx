import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  CloseButton,
  Heading,
  VStack,
} from "@chakra-ui/react";
import type { LoaderFunction } from "remix";
import { Form, json, useLoaderData } from "remix";
import { auth, sessionStorage } from "~/auth.server";

type LoaderData = {
  error: { message: string } | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  await auth.isAuthenticated(request, { successRedirect: "/job-applications" });
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const error = session.get(auth.sessionErrorKey) as LoaderData["error"];
  return json<LoaderData>({ error });
};

export default function Screen() {
  const { error } = useLoaderData<LoaderData>();

  return (
    <Form method="post" action="/auth/google" className="flex items-center justify-center h-screen">
      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error.message}</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      ) : null}
      <Center minH="100vh" color="white">
        <VStack spacing="20px">
          <Heading as="h1" size="2xl" color="gray.400">
            Dream Job 🔎
          </Heading>
          <Button colorScheme="blue" type="submit">
            Sign In with Google
          </Button>
        </VStack>
      </Center>
    </Form>
  );
}
