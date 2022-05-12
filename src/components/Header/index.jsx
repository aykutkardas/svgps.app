import styles from "./Header.module.css";

import Icon from "src/components/Icon";
import ThemeSwitcher from "src/components/ThemeSwitcher";

const Header = ({ theme, setTheme }) => (
  <div className={styles.Header}>
    <div className={styles.Logo}>
      <Icon icon="package" size={30} /> SVGPS
    </div>
    <div className={styles.Menu}>
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
      <a
        href="https://twitter.com/aykutkardas"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter"
        className={styles.SocialLink}
      >
        <Icon icon="twitter" size={20} />
        Twitter
      </a>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
    </div>
  </div>
);

export default Header;
