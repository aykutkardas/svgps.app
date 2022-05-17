import styles from "./Footer.module.css";

import Icon from "src/components/Icon";

import packageJson from "../../../package.json";

const socials = [
  {
    name: "GitHub",
    icon: "github",
    iconSize: 22,
    url: "https://github.com/aykutkardas/svgps.app",
  },
  {
    name: "Twitter",
    icon: "twitter",
    iconSize: 20,
    url: "https://twitter.com/aykutkardas",
  },
];

const Footer = () => (
  <div className={styles.Footer}>
    <span>v{packageJson.version}</span>
    <div className={styles.Social}>
      {socials.map(({ name, icon, iconSize, url }) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          aria-label={name}
          className={styles.SocialLink}
          key={name}
        >
          <Icon icon={icon} size={iconSize} />
        </a>
      ))}
    </div>
  </div>
);

export default Footer;
