import { useState } from "react";

import Button from "./Button";
import Icon from "./Icon";
import supabase from "src/utils/supabase";
import useAuthStore from "src/stores/auth";

const LoginForm = ({ onRegister }) => {
  const authStore = useAuthStore();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const [email, password] = e.target;
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (error) throw error;

      authStore.login();
      window.location.href = "/";
    } catch (err) {
      setLoading(false);
      setError(err.items);
    }
  };
  return (
    <form className="m-10 flex flex-col gap-2" onSubmit={handleSignIn}>
      <h1 className="pb-6 text-xl font-medium text-white">
        <Icon icon="package" size={30} className="mr-2 text-purple-400" />
        Log In to SVGPS
      </h1>

      <input
        className="text-md rounded-md bg-neutral-900 px-2 py-2 text-white outline-none placeholder:text-neutral-500 md:text-sm"
        type="email"
        placeholder="your@email.com"
      />
      <input
        className="text-md rounded-md bg-neutral-900 px-2 py-2  text-white outline-none placeholder:text-neutral-500 md:text-sm"
        autoComplete="new-password"
        type="password"
        placeholder="password"
      />

      {error && (
        <div className="rounded-md text-[11px] text-rose-400">
          <p>Something went wrong!</p>
        </div>
      )}

      <div className="flex flex-col space-y-8">
        <div className="mt-4 flex flex-col items-start justify-start space-y-1 md:flex-row md:space-y-0 md:space-x-3">
          <Button
            variant="primary"
            className="w-full flex-1"
            type="submit"
            disabled={loading}
          >
            Login
          </Button>
          {/* <Link href="https://c4-na.altogic.com/_auth/63c97c1855255ede9cd8b46a/google">
            <Button
              variant="ghost"
              className="w-full bg-neutral-500/10 !text-neutral-200"
            >
              <Icon icon="google" size={16} className="mr-2" />
              Login with Google
            </Button>
          </Link> */}
        </div>
        <hr className="-mx-10 border-neutral-500/20" />
        <span className=" flex items-center justify-center text-xs text-neutral-500">
          Don&apos;t have an account?
          <a
            className="mx-2 cursor-pointer text-neutral-200 hover:text-neutral-300"
            onClick={onRegister}
          >
            Register
          </a>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
