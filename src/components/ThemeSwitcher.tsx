import { useEffect, useState } from "react";
import lookie from "lookie";

import Icon from "src/components/Icon";

const ThemeSwitcher = () => {
  const initialTheme = lookie.get("theme") || "dark";

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.querySelector("html").dataset.theme = theme;
    lookie.set("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  const handleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
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
