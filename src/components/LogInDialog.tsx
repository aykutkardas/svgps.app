import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import altogic from "src/configs/altogic";
import { useAuthContext } from "src/context/AuthContext";
import Link from "next/link";
import Button from "./Button";
import Icon from "./Icon";
import FeatureTable from "./FeatureTable";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LogInDialog = ({ isOpen, setIsOpen }) => {
  const closeDialog = () => setIsOpen(false);
  const [tab, setTab] = useState<"register" | "login">("login");

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
              <Dialog.Panel className=" transform overflow-hidden rounded-2xl bg-neutral-100 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                <div className="mx-auto  flex rounded-2xl bg-neutral-800">
                  {tab === "login" ? (
                    <LoginForm onRegister={() => setTab("register")} />
                  ) : (
                    <RegisterForm onLogin={() => setTab("login")} />
                  )}
                  <div className="relative ml-3 hidden items-center justify-center overflow-hidden bg-neutral-900/70 p-6 md:flex">
                    <Icon
                      icon="package"
                      size={280}
                      className="pointer-events-none absolute -bottom-20 -right-14 text-neutral-700/20"
                    />
                    <FeatureTable />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LogInDialog;
