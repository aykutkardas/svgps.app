import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Icon from "src/components/Icon";
import NavLink from "src/components/NavLink";
import Notification from "src/components/Notification";
import Button from "src/components/Button";
import UserMenu from "src/components/UserMenu";
import LogInDialog from "./LogInDialog";
import useAuthStore from "src/stores/auth";

const Header = () => {
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!openLoginDialog && searchParams?.get("sign-in")) {
      setOpenLoginDialog(true);
      router.push(pathname || "/");
    }
  }, [searchParams]);

  return (
    <div className="relative mt-20 flex h-12 w-full shrink-0 justify-between md:mt-16 lg:mt-0">
      <div className="flex cursor-pointer select-none flex-nowrap items-center justify-center text-violet-600 dark:text-violet-500">
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
        {!isAuthenticated && (
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
        {isAuthenticated && <UserMenu />}
      </nav>
    </div>
  );
};

export default Header;
