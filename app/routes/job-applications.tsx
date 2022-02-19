import { Outlet } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { Form, json, useLoaderData } from "remix";
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
  useLoaderData<LoaderData>();

  return (
    <>
      <header>
        <h1>Job Applications</h1>
        <Form method="post">
          <button>Log Out</button>
        </Form>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Built by @nopitown</footer>
    </>
  );
}
