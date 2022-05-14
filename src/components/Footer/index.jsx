import styles from "./Footer.module.css";

import Icon from "src/components/Icon";

import packageJson from "../../../package.json";

const Footer = () => (
  <div className={styles.Footer}>
    <span>v{packageJson.version}</span>
    <div className={styles.Social}>
      <a
        href="https://github.com/aykutkardas/svgps-online"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className={styles.SocialLink}
      >
        <Icon icon="github" size={22} />
      </a>
      <a
        href="https://twitter.com/aykutkardas"
        target="_blank"
        rel="noreferrer"
        aria-label="Twitter"
        className={styles.SocialLink}
      >
        <Icon icon="twitter" size={20} />
      </a>
    </div>
  </div>
);

export default Footer;
