import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = ({ theme, setTheme }) => {
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <label className={styles.Switch}>
      <input
        className={styles.SwitchInput}
        type="checkbox"
        defaultChecked={theme === "dark"}
        onClick={handleTheme}
      />
      <span className={styles.Slider} />
    </label>
  );
};

export default ThemeSwitcher;
