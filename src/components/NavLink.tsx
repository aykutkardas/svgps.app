"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavLink = ({ children, href }) => {
  const pathname = usePathname();
  const path = pathname?.split("/")[1];
  const active = path === href.slice(1);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={clsx(
        "rounded-lg px-3 py-1.5 text-[13px] font-medium transition",
        active
          ? "bg-white/[0.08] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
          : "text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
