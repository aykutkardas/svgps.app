import Link from "next/link";

import { useRouter } from "next/router";
import clsx from "clsx";

const NavLink = ({ children, href }) => {
  const router = useRouter();
  const pathName = router.pathname.replace("/[iconSet]", "");

  return (
    <Link href={href}>
      <a
        className={clsx(
          "relative",
          pathName === href
            ? "text-fuchsia-600 dark:text-fuchsia-500"
            : "text-neutral-700 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-300"
        )}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
