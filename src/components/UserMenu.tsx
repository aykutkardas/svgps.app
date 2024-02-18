"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import supabase from "src/utils/supabase";
import useAuthStore from "src/stores/auth";

export default function UserMenu() {
  const router = useRouter();
  const authStore = useAuthStore();

  const logout = async () => {
    await supabase.auth.signOut();
    authStore.logout();
    router.push("/");
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <img
          src={"/images/avatar.png"}
          alt="Profile Picture"
          className="h-8 w-8 cursor-pointer rounded-full border-2 border-neutral-700 bg-gradient-to-br from-pink-400 to-purple-400 shadow-md hover:border-neutral-600"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 mt-2 origin-top-right divide-y divide-gray-100 rounded-lg bg-neutral-700 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenu.Item
            onClick={logout}
            className={clsx(
              "flex cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500",
            )}
          >
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
