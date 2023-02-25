import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useAuthContext } from "src/context/AuthContext";
import Button from "./Button";
import Icon from "./Icon";
import altogic from "src/configs/altogic";

const RegisterForm = ({ onLogin }) => {
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
    <form className="m-10 flex flex-col gap-2" onSubmit={handleSignUp}>
      <h1 className="pb-6 text-xl font-medium text-white">
        <Icon icon="package" size={30} className="mr-2 text-purple-400" />
        Create an Account
      </h1>
      {success && <div className="bg-green-500 p-2 text-white">{success}</div>}

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
        <div key={message} className="rounded-md text-[11px] text-rose-400">
          <p>{message}</p>
        </div>
      ))}
      <div className="flex flex-col space-y-8">
        <div className="mt-4 flex flex-col items-start justify-start space-y-1 md:flex-row md:space-y-0 md:space-x-3">
          <Button
            variant="primary"
            className="w-full flex-1"
            type="submit"
            disabled={loading}
          >
            Register
          </Button>
          <Link href="https://c4-na.altogic.com/_auth/63c97c1855255ede9cd8b46a/google">
            <Button
              variant="ghost"
              className="w-full bg-neutral-500/10 !text-neutral-200"
            >
              <Icon icon="google" size={16} className="mr-2" />
              Register with Google
            </Button>
          </Link>
        </div>
        <hr className="-mx-10 border-neutral-500/20" />
        <span className=" flex items-center justify-center text-xs text-neutral-500">
          Do you have an account?
          <a
            className="mx-2 cursor-pointer text-neutral-200 hover:text-neutral-300"
            onClick={onLogin}
          >
            Login
          </a>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
