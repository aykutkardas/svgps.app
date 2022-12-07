import { useEffect, useState } from "react";
import lookie from "lookie";

import Icon from "src/components/Icon";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storeTheme = lookie.get("theme");
    /**
     * If there is no theme value on localStorage add default value to storage
     */
    if (storeTheme) {
      setTheme(storeTheme);
    } else {
      lookie.set("theme", "dark");
    }
  }, []);

  const isDark = theme === "dark";

  const handleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    document.querySelector("html").dataset.theme = newTheme;
    lookie.set("theme", newTheme);
    setTheme(newTheme);
  };

  const icon = isDark ? "moon" : "sun";

  return (
    <Icon
      icon={icon}
      size={20}
      onClick={handleTheme}
      className="cursor-pointer select-none text-neutral-700 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300"
    />
  );
};

export default ThemeSwitcher;
