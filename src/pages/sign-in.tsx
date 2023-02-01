import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import altogic from "../configs/altogic";
import { useAuthContext } from "../context/AuthContext";

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
      router.push("/profile");
    } catch (err) {
      setLoading(false);
      setError(err.items);
    }
  };

  return (
    <section className="flex h-96 flex-col items-center justify-center gap-4">
      <form
        className="flex w-full flex-col gap-2 md:w-96"
        onSubmit={handleSignIn}
      >
        <h1 className="self-start text-3xl font-bold">Login to your account</h1>
        {error?.map(({ message }) => (
          <div key={message} className="bg-red-600 p-2 text-[13px] text-white">
            <p>{message}</p>
          </div>
        ))}

        <input type="email" placeholder="Type your email" />
        <input
          autoComplete="new-password"
          type="password"
          placeholder="Type your password"
        />
        <div className="flex justify-between gap-4">
          <Link className="text-indigo-600" href="/sign-up">
            Don't have an account? Register now
          </Link>
          <button
            type="submit"
            className="shrink-0 border border-gray-500 py-2 px-3 transition hover:bg-gray-500 hover:text-white"
            disabled={loading}
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignIn;
