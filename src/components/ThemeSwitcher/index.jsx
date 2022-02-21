import styles from "./ThemeSwitcher.module.css";
import cx from "classnames";

const ThemeSwitcher = ({ theme, setTheme }) => (
  <label className={styles.Switch}>
    <input
      type="checkbox"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
    <span className={cx(styles.Slider, styles.Round)}></span>
  </label>
);

export default ThemeSwitcher;
