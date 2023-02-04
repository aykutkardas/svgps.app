import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import altogic from "src/configs/altogic";
import { useAuthContext } from "src/context/AuthContext";
import Link from "next/link";
import Button from "./Button";
import Icon from "./Icon";

const LogInDialog = ({ isOpen, setIsOpen }) => {
  const closeDialog = () => setIsOpen(false);

  const { setAuth, setSession } = useAuthContext();

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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100 delay-300"
              enterFrom="opacity-0 scale-95 delay-300"
              enterTo="opacity-100 scale-100 delay-300"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[500px] max-w-[90%] transform overflow-hidden rounded-2xl bg-neutral-100 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                <form
                  className="mx-auto flex flex-col gap-2 rounded-2xl bg-neutral-800 p-8"
                  onSubmit={handleSignIn}
                >
                  <h1 className="pb-6 text-xl font-medium text-white">
                    <Icon
                      icon="package"
                      size={30}
                      className="mr-2 text-purple-400"
                    />
                    Log In to SVGPS
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
                    <div
                      key={message}
                      className="rounded-md text-[11px] text-rose-400"
                    >
                      <p>{message}</p>
                    </div>
                  ))}

                  <div className="flex flex-col space-y-8">
                    <div className="mt-4 flex items-center justify-between gap-x-4">
                      <Button
                        variant="primary"
                        type="submit"
                        className="flex-1"
                        disabled={loading}
                      >
                        Login
                      </Button>
                      <span className="mx-2 text-neutral-400">or</span>
                      <Link href="https://c4-na.altogic.com/_auth/63c97c1855255ede9cd8b46a/google">
                        <Button variant="ghost" className="!text-neutral-200">
                          <Icon icon="google" size={16} className="mr-2" />
                          Login with Google
                        </Button>
                      </Link>
                    </div>
                    <hr className="-mx-10 border-neutral-500/20" />
                    <span className=" flex items-center justify-center text-xs text-neutral-500">
                      Don't have an account?
                      <Link href="/sign-up">
                        <a className="mx-2 text-neutral-200">Register</a>
                      </Link>
                    </span>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LogInDialog;
