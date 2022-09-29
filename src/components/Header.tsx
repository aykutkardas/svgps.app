import Link from "next/link";
import Icon from "src/components/Icon";

import NavLink from "./NavLink";
import ThemeSwitcher from "./ThemeSwitcher";
import Notification from "./Notification";

const Header = () => (
  <div className="flex h-12 w-full shrink-0 justify-between">
    <div className="flex cursor-pointer select-none flex-nowrap items-center justify-center text-fuchsia-600 dark:text-fuchsia-500">
      <Link href="/">
        <span className="flex items-center">
          <Icon icon="package" className="h-8 w-8" />
          <span className="hidden font-roboto font-bold dark:after:text-neutral-400 sm:block">
            SVGPS
          </span>
        </span>
      </Link>
    </div>
    <nav className="flex items-center gap-3 text-sm font-medium">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/store">
        <span className="absolute -top-3 -right-2 h-5 rounded-md  px-1 text-[9px] tracking-widest text-pink-700 dark:text-pink-400">
          BETA
        </span>
        Store
      </NavLink>
      <NavLink href="/app">App</NavLink>
      <a
        href="https://github.com/aykutkardas/svgps.app"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="flex items-center text-neutral-700 hover:text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-300"
      >
        GitHub
      </a>
      <Notification />
      <ThemeSwitcher />
    </nav>
  </div>
);

export default Header;
