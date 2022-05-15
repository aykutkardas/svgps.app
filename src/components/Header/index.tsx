import styles from "./Header.module.css";

import Icon from "src/components/Icon";
import ThemeSwitcher from "src/components/ThemeSwitcher";
import UploadWrapper from "../UploadWrapper";
import Button from "../Button";
import { IconsType } from "src/types";

interface HeaderProps {
  icons: IconsType;
  setIcons: (icons: IconsType) => void;
}

const Header = ({ icons, setIcons }: HeaderProps) => (
  <div className={styles.Header}>
    <div className={styles.Logo}>
      <Icon icon="package" size={30} /> SVGPS
    </div>
    <div className={styles.Menu}>
      <UploadWrapper icons={icons} setIcons={setIcons}>
        <Button>Upload</Button>
      </UploadWrapper>
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

export default Header;
