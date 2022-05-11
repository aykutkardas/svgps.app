import styles from "./Footer.module.css";

import packageJson from "../../../package.json";

const Footer = () => (
  <div className={styles.Footer}>v{packageJson.version}</div>
);

export default Footer;
