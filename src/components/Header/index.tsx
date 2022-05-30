import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

import Icon from "src/components/Icon";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import UploadWrapper from "src/components/UploadWrapper";
import Button from "src/components/Button";
import { IconsType } from "src/types";

interface HeaderProps {
  icons: IconsType;
  setIcons: (icons: IconsType) => void;
}

const Header = ({ icons, setIcons }: HeaderProps) => {
  const linkStyles = ({ isActive }) =>
    isActive ? styles.ActiveLink : undefined;

  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>
        <NavLink to="/" className={linkStyles}>
          <Icon icon="package" size={30} />
          <span>SVGPS</span>
        </NavLink>
      </div>
      <div className={styles.Menu}>
        <UploadWrapper icons={icons} setIcons={setIcons}>
          <NavLink to="/my-icons" className={linkStyles}>
            <Button>Upload</Button>
          </NavLink>
        </UploadWrapper>
        <nav className={styles.RouteLinks}>
          <NavLink to="/" className={linkStyles}>
            About
          </NavLink>
          <NavLink to="/my-icons" className={linkStyles}>
            My icons
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
          Github
        </a>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
