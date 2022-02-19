import type { LoaderFunction } from "remix";
import { auth } from "~/auth.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  return auth.authenticate("google", request, {
    successRedirect: "/job-applications",
    failureRedirect: "/",
  });
};
