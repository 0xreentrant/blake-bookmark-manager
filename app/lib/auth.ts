import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, User } from "lucia";
import { Lucia } from "lucia";
import { Google } from "arctic";

import * as schema from "@/lib/schema";
import { db } from "@/lib/db";

const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessions, schema.users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes: DatabaseUserAttributes) => {
    return {
      googleId: attributes.google_id,
      googleAvatar: attributes.google_avatar,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export type DatabaseUserAttributes = {
  google_id: string;
  google_avatar: string;
  given_name: string;
  family_name: string;
};

export type UserCookie =
  | { user: User; session: Session }
  | { user: null; session: null };

export const validateRequest = cache(async (): Promise<UserCookie> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}
  return result;
});

///////////
// Types //
///////////

/*
 * Google account
 */

export type GoogleUser = {
  picture: string;
  email: string;
  given_name: string;
  family_name: string;
};

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_CLIENT_CALLBACK!
);

/*
 * Blake user
 */

export type ClientUser = {
  userId: string;
  username: string;
  givenName: string;
  familyName: string;
  avatar: string;
};

/////////////
// Helpers //
/////////////

/*
 * @dev intentionally validate the cookie. if this ever becomes non-performant, add a flag or optionally call "cookie()" directly
 * @dev server components only
 */
export const getUserCookie = async () => {
  const { user }: { user: User } = await validateRequest();
  return user;
};
