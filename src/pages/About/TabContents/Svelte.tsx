import Icon from "src/components/Icon";
import styles from "../About.module.css";

const TabContentSvelte = () => (
  <div>
    <p>
      <a
        className={styles.Link}
        href="https://github.com/aykutkardas/svelte-icomoon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon icon="github" size={18} />
        svelte-icomoon
      </a>
    </p>

    <p>Details coming soon.</p>
  </div>
);

export default TabContentSvelte;
