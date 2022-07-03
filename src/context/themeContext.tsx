import { useState, createContext } from "react";
import lookie from "lookie";

type Theme = "dark" | "light";

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialTheme = lookie.get("theme") || "dark";

const ThemeContext = createContext<IThemeContext>({
  theme: initialTheme,
  setTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
