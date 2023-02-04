import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { Fragment } from "react";

import Icon from "src/components/Icon";
import altogic from "src/configs/altogic";
import { useAuthContext } from "src/context/AuthContext";

export default function CollectionAction({ auth }) {
  const router = useRouter();
  const { setAuth } = useAuthContext();

  const logout = async () => {
    await altogic.auth.signOut();
    router.push("/");
    setAuth(null);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full items-center justify-center rounded-md  p-1 text-sm font-medium text-white hover:bg-neutral-700 hover:bg-opacity-30">
          <img
            src={auth.profilePicture}
            className="h-8 w-8 rounded-full border-2 border-neutral-700 bg-gradient-to-br from-pink-400 to-purple-400 shadow-md"
            onError={(e) => {
              // @ts-expect-error
              e.target.setAttribute("src", "/images/avatar.png");
            }}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-lg bg-neutral-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={clsx(
                    "flex w-full items-center rounded-md px-2 py-2 text-sm text-neutral-200",
                    { "bg-violet-500": active }
                  )}
                >
                  <Icon icon="logout" size={16} className="mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
