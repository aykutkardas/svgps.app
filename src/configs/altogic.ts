import { createClient } from "altogic";

const client = createClient(
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_CLIENT_KEY,
  { signInRedirect: "/sign-in" }
);

export default client;
