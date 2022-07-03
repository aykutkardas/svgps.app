import { useState, createContext, useEffect } from "react";
import lookie from "lookie";
import { IconSetItem } from "src/types";
import isValidIcons from "src/utils/isValidIcons";

interface IIconsContext {
  icons: IconSetItem[];
  setIcons: (icons: IconSetItem[]) => void;
}

const IconsContext = createContext<IIconsContext>({
  icons: [],
  setIcons: () => {},
});

const IconsProvider = ({ children }) => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    const storagedIcons = lookie.get("icons") || [];
    const isValid = isValidIcons(storagedIcons);
    const initialIcons = isValid ? storagedIcons : [];
    setIcons(initialIcons);
    lookie.set("icons", initialIcons);
  }, []);

  useEffect(() => {
    lookie.set("icons", icons);
  }, [icons]);

  return (
    <IconsContext.Provider value={{ icons, setIcons }}>
      {children}
    </IconsContext.Provider>
  );
};

export { IconsContext, IconsProvider };
