import { useState } from "react";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.body.dataset.theme = newTheme;
    setTheme(newTheme);
  };

  return (
    <label className={styles.Switch}>
      <input
        className={styles.SwitchInput}
        type="checkbox"
        onClick={handleTheme}
      />
      <span className={styles.Slider} />
    </label>
  );
};

export default ThemeSwitcher;
