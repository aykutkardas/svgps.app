import packageJson from "../../../package.json";

import styles from "./Footer.module.css";

const Footer = () => (
  <div className={styles.Footer}>
    <span>v{packageJson.version}</span>
  </div>
);

export default Footer;
