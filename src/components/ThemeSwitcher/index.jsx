import { useEffect, useState } from "react";
import lookie from "lookie";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(lookie.get("theme") || "dark");

  useEffect(() => {
    document.body.dataset.theme = theme;
    lookie.set("theme", theme);
  }, [theme]);

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
