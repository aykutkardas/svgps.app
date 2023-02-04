import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Icon from "src/components/Icon";
import NavLink from "src/components/NavLink";
import Notification from "src/components/Notification";
import Button from "src/components/Button";
import UserMenu from "src/components/UserMenu";
import { useAuthContext } from "src/context/AuthContext";
import LogInDialog from "./LogInDialog";

const Header = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const { auth } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (!openLoginDialog && router.query["sign-in"]) {
      setOpenLoginDialog(true);
      router.push(router.asPath.replace("?sign-in=true", ""), undefined, {
        shallow: true,
      });
    }
  }, [router.query]);

  return (
    <div className="flex h-12 w-full shrink-0 justify-between">
      <div className="flex cursor-pointer select-none flex-nowrap items-center justify-center text-purple-600 dark:text-purple-500">
        <Link href="/">
          <span className="flex items-center">
            <Icon icon="package" className="h-8 w-8" />
            <span className="hidden font-bold dark:after:text-neutral-400 sm:block">
              SVGPS
            </span>
          </span>
        </Link>
      </div>
      <nav className="flex items-center gap-3  text-sm font-medium sm:gap-5">
        <NavLink href="/store">Store</NavLink>
        <NavLink href="/collection">Collection</NavLink>
        <a
          href="https://github.com/aykutkardas/svgps.app"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="flex items-center text-neutral-700 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-300"
        >
          <Icon icon="github" className="h-5 w-5" />
        </a>
        {/* notifications are temporarily hidden */}
        {false && <Notification />}
        {!auth && (
          <>
            <Button onClick={() => setOpenLoginDialog(true)} variant="primary">
              Login
            </Button>
            <LogInDialog
              isOpen={openLoginDialog}
              setIsOpen={setOpenLoginDialog}
            />
          </>
        )}
        {auth && <UserMenu auth={auth} />}
      </nav>
    </div>
  );
};

export default Header;
