import { useState, createContext } from "react";
import lookie from "lookie";

interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

const initialTheme = lookie.get("theme") || "dark";

const ThemeContext = createContext<IThemeContext>(initialTheme);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
