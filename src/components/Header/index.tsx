import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

import Icon from "src/components/Icon";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import ImportButton from "src/components/ImportButton";

const Header = () => {
  const linkStyles = ({ isActive }) =>
    isActive ? styles.ActiveLink : undefined;

  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <NavLink to="/">
          <Icon icon="package" size={30} />
          <span>SVGPS</span>
        </NavLink>
      </div>
      <div className={styles.Menu}>
        <nav className={styles.RouteLinks}>
          <NavLink to="/" className={linkStyles}>
            About
          </NavLink>
          <NavLink to="/icons" className={linkStyles}>
            Icons
          </NavLink>
        </nav>
        <a
          href="https://github.com/aykutkardas/svgps-online"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className={styles.SocialLink}
        >
          <Icon icon="github" size={22} />
        </a>
        <ThemeSwitcher />
        <ImportButton />
      </div>
    </div>
  );
};

export default Header;
