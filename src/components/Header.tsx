import { NavLink } from "react-router-dom";

import Icon from "src/components/Icon";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import Notification from "src/components/Notification";

const getActiveClassName = ({ isActive }) =>
  isActive
    ? "text-fuchsia-600 dark:text-fuchsia-500"
    : "text-neutral-700 dark:text-neutral-100 hover:text-neutral-700 dark:hover:text-neutral-300";

const Header = () => (
  <div className="flex h-12 w-full justify-between">
    <div className="flex cursor-pointer select-none flex-nowrap items-center justify-center text-fuchsia-600 dark:text-fuchsia-500">
      <NavLink to="/" className="flex items-center">
        <Icon icon="package" className="h-8 w-8" />
        <span className="hidden font-roboto font-bold dark:after:text-neutral-400 sm:block">
          SVGPS
        </span>
      </NavLink>
    </div>
    <nav className="flex items-center gap-3 text-sm font-medium">
      <NavLink to="/" className={getActiveClassName}>
        Home
      </NavLink>
      <NavLink to="/icons" className={getActiveClassName}>
        Icons
      </NavLink>
      <NavLink to="/app" className={getActiveClassName}>
        App
      </NavLink>
      <a
        href="https://github.com/aykutkardas/svgps.app"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="flex items-center text-neutral-700 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
      >
        GitHub
      </a>
      <Notification />
      <ThemeSwitcher />
    </nav>
  </div>
);

export default Header;
