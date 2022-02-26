import { createCookieSessionStorage } from "remix";
import { Authenticator } from "remix-auth";
import type { GoogleExtraParams, GoogleProfile } from "remix-auth-google";
import { GoogleStrategy } from "remix-auth-google";
import { findOrCreateUser, findUserByEmail } from "~/user";

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is required");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is required");
}

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is required");
}

if (!process.env.COOKIES_SECRET) {
  throw new Error("COOKIES SECRETS is required");
}

const BASE_URL = process.env.BASE_URL;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.COOKIES_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export const auth = new Authenticator<{
  profile: GoogleProfile;
  accessToken: string;
  extraParams: GoogleExtraParams;
}>(sessionStorage);

auth.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: new URL("/auth/google/callback", BASE_URL).toString(),
    },
    async ({ profile, accessToken, extraParams }) => {
      await findOrCreateUser({ email: profile.emails[0].value, name: profile.displayName });
      return { profile, accessToken, extraParams };
    }
  )
);

export const geUserFromSession = async (request: Request) => {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const {
    user: { profile },
  } = session.data;
  const userEmail = profile.emails[0].value;
  const user = await findUserByEmail(userEmail);

  return user;
};
