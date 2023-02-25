import clsx from "clsx";
import { useRouter } from "next/router";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <img
          src={auth.profilePicture}
          className="h-8 w-8 cursor-pointer rounded-full border-2 border-neutral-700 bg-gradient-to-br from-pink-400 to-purple-400 shadow-md hover:border-neutral-600"
          onError={(e) => {
            // @ts-expect-error
            e.target.setAttribute("src", "/images/avatar.png");
          }}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 mt-2 origin-top-right divide-y divide-gray-100 rounded-lg bg-neutral-700 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenu.Item
            onClick={logout}
            className={clsx(
              "flex cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500"
            )}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
