"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavLink = ({ children, href }) => {
  const pathname = usePathname();
  const path = pathname?.split("/")[1];

  return (
    <Link
      href={href}
      className={clsx(
        "relative",
        path === href.slice(1)
          ? "text-purple-600 dark:text-purple-500"
          : "text-neutral-700 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-300",
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
