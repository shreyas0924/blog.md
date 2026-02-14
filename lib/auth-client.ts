import { createAuthClient } from "better-auth/react";

const client = createAuthClient({
  baseURL: "http://localhost:3000",
});

export const authClient = client;
export const { signIn, signUp, signOut, useSession } = client;
