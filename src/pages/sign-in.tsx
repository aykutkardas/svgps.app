import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import altogic from "../configs/altogic";
import Head from "next/head";

import { useAuthContext } from "src/context/AuthContext";
import Button from "src/components/Button";
import Header from "src/components/Header";
import Icon from "src/components/Icon";

function SignIn() {
  const { setAuth, setSession } = useAuthContext();
  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const [email, password] = e.target;
    try {
      setLoading(true);
      const { user, session, errors } = await altogic.auth.signInWithEmail(
        email.value,
        password.value
      );

      if (errors) {
        throw errors;
      }

      setAuth(user);
      setSession(session);
      window.location.href = "/";
    } catch (err) {
      setLoading(false);
      setError(err.items);
    }
  };

  return (
    <div className="mx-auto flex max-h-screen w-full flex-col overflow-hidden py-3 px-3 md:px-8">
      <Head>
        <title>Sign In</title>
      </Head>
      <Header />
      <section className="mx-auto flex h-screen flex-col items-center justify-center gap-4">
        <form
          className="mx-auto flex flex-col gap-2 rounded-2xl border border-neutral-700 bg-neutral-800 p-10"
          onSubmit={handleSignIn}
        >
          <h1 className="self-start bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text pb-6 text-3xl font-bold text-transparent">
            Login to your account
          </h1>

          <input
            className="text-md rounded-md bg-neutral-900 px-2 py-2 text-white placeholder:text-neutral-500 md:text-sm"
            type="email"
            placeholder="your@email.com"
          />
          <input
            className="text-md rounded-md bg-neutral-900 px-2  py-2 text-white placeholder:text-neutral-500 md:text-sm"
            autoComplete="new-password"
            type="password"
            placeholder="password"
          />

          {error?.map(({ message }) => (
            <div key={message} className="rounded-md text-[11px] text-rose-400">
              <p>{message}</p>
            </div>
          ))}

          <div className="flex flex-col space-y-4">
            <div className="mt-4 flex items-center justify-between gap-x-4">
              <Link href="/sign-up">
                <Button
                  variant="ghost"
                  className="flex-1"
                  disabled={loading}
                  tabIndex={-1}
                >
                  Register
                </Button>
              </Link>
              <Button
                variant="primary"
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                Login
              </Button>
            </div>

            <hr className="-mx-10 border-neutral-700" />

            <Link href="https://c4-na.altogic.com/_auth/63c97c1855255ede9cd8b46a/google">
              <Button variant="secondary">
                <Icon icon="google" size={16} className="mr-2" />
                Login with Google
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default SignIn;
