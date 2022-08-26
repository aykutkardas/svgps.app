import { useEffect, useContext } from "react";
import lookie from "lookie";
import cx from "classnames";

import { ThemeContext } from "src/context/themeContext";
import { Switch } from "@headlessui/react";

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
    <Switch
      checked={isChecked}
      onChange={handleTheme}
      className={cx(
        "relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-transparent",
        "transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
        isChecked ? "bg-neutral-200" : "bg-neutral-700"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={cx(
          "pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full ring-0 transition duration-200 ease-in-out",
          "bg-white shadow-lg dark:bg-neutral-900",
          isChecked ? "translate-x-[15px]" : "translate-x-0"
        )}
      />
    </Switch>
  );
};

export default ThemeSwitcher;
