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
      {error ? <div>{error.message}</div> : null}
      <button className="btn">Sign In with Google</button>
    </Form>
  );
}
