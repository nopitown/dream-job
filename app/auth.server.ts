import { createCookieSessionStorage } from "remix";
import { Authenticator } from "remix-auth";
import type { GoogleExtraParams, GoogleProfile } from "remix-auth-google";
import { GoogleStrategy } from "remix-auth-google";

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is required");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET is required");
}

if (!process.env.BASE_URL) {
  throw new Error("BASE_URL is required");
}

const BASE_URL = process.env.BASE_URL;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret"], // This should be an env variable
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
      return { profile, accessToken, extraParams };
    }
  )
);