import { useEffect, useContext } from "react";
import lookie from "lookie";
import cx from "classnames";

import { ThemeContext } from "src/context/themeContext";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.dataset.theme = theme;
    lookie.set("theme", theme);
  }, [theme]);

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const isChecked = theme === "dark";

  return (
    <label
      htmlFor="toggleTwo"
      className="flex items-center cursor-pointer select-none"
    >
      <div className="relative">
        <input
          type="checkbox"
          id="toggleTwo"
          className="sr-only"
          checked={theme === "dark"}
          onChange={handleTheme}
        />
        <div className="block bg-neutral-800 dark:bg-neutral-50 w-[30px] h-[20px] rounded-full"></div>
        <div
          className={cx(
            "dot w-[14px] h-[14px] absolute top-[3px]",
            "bg-white dark:bg-neutral-800 rounded-full",
            {
              "right-[3px]": isChecked,
              "left-[3px]": !isChecked,
            }
          )}
        />
      </div>
    </label>
  );
};

export default ThemeSwitcher;
