import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "src/components/Button";
import Header from "src/components/Header";
import FeatureTable from "src/components/FeatureTable";
import Icon from "src/components/Icon";
import altogic from "src/configs/altogic";
import { useAuthContext } from "src/context/AuthContext";

function SignUp() {
  const { setAuth, setSession } = useAuthContext();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const [name, email, password] = e.target;
    try {
      setLoading(true);
      const { user, session, errors } = await altogic.auth.signUpWithEmail(
        email.value,
        password.value,
        name.value
      );

      if (errors) {
        throw errors;
      }

      if (session) {
        setAuth(user);
        setSession(session);
        router.push("/");
      } else {
        setSuccess(`We sent a verification link to ${email.value}`);
        setError(null);
        setLoading(false);
        name.value = "";
        email.value = "";
        password.value = "";
      }
    } catch (err) {
      setSuccess(null);
      setError(err.items);
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
      <Head>
        <title>Sign Up</title>
      </Head>
      <Header />
      <section className="mx-auto flex h-screen flex-col items-center justify-center gap-4">
        <form
          className="mx-auto  flex rounded-2xl bg-neutral-800"
          onSubmit={handleSignUp}
        >
          <div className="m-10 flex flex-col gap-2">
            <h1 className="pb-6 text-xl font-medium text-white">
              <Icon icon="package" size={30} className="mr-2 text-purple-400" />
              Create an Account
            </h1>
            {success && (
              <div className="bg-green-500 p-2 text-white">{success}</div>
            )}

            <input
              className="text-md rounded-md bg-neutral-900 px-2 py-2 text-white outline-none placeholder:text-neutral-500 md:text-sm"
              type="text"
              placeholder="Name"
            />
            <input
              className="text-md rounded-md bg-neutral-900 px-2 py-2 text-white outline-none placeholder:text-neutral-500 md:text-sm"
              type="email"
              placeholder="Email"
            />
            <input
              className="text-md rounded-md bg-neutral-900 px-2 py-2 text-white outline-none placeholder:text-neutral-500 md:text-sm"
              autoComplete="new-password"
              type="password"
              placeholder="Password"
            />

            {error?.map(({ message }) => (
              <div
                key={message}
                className="rounded-md text-[11px] text-rose-400"
              >
                <p>{message}</p>
              </div>
            ))}
            <div className="flex flex-col">
              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="primary"
                  className="w-32"
                  type="submit"
                  disabled={loading}
                >
                  Register
                </Button>
              </div>
              <Link href="https://c4-na.altogic.com/_auth/63c97c1855255ede9cd8b46a/google">
                <Button
                  variant="ghost"
                  className="mt-3 bg-neutral-500/10 !text-neutral-200"
                >
                  <Icon icon="google" size={16} className="mr-2" />
                  Register with Google
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative ml-3 hidden items-center justify-center overflow-hidden bg-neutral-900/70 p-6 md:flex">
            <Icon
              icon="package"
              size={280}
              className="pointer-events-none absolute -bottom-20 -right-14 text-neutral-700/20"
            />
            <FeatureTable />
          </div>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
