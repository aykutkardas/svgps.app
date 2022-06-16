import styles from "./Footer.module.css";

import packageJson from "../../../package.json";

const Footer = () => (
  <div className={styles.Footer}>
    <span>v{packageJson.version}</span>
  </div>
);

export default Footer;
