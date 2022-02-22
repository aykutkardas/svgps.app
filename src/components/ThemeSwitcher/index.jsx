import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = ({ theme, setTheme }) => (
  <label className={styles.Switch}>
    <input
      className={styles.SwitchInput}
      type="checkbox"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
    <span className={styles.Slider} />
  </label>
);

export default ThemeSwitcher;
