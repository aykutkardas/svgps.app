import styles from "./App.module.css";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import lookie from "lookie";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import LandingSection from "src/components/LandingSection";
import IconPreviewArea from "src/components/IconPreviewArea";
import convertToSelectionFormat from "src/utils/convertToSelectionFormat";
import { IconSet } from "./types";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [iconSet, setIconSet] = useState<IconSet>();

  useEffect(() => {
    const initialIcons = lookie.get("icons") || [];
    setIcons(initialIcons);
  }, []);

  useEffect(() => {
    const formattedIcons = convertToSelectionFormat(icons);
    setIconSet(formattedIcons);
    lookie.set("icons", icons);
  }, [icons]);

  const toastOptions = {
    style: {
      background: "var(--neutral-800)",
      color: "var(--neutral-50)",
    },
  };

  return (
    <div className={styles.App}>
      <Toaster toastOptions={toastOptions} position="top-right" />
      <Header icons={icons} setIcons={setIcons} />
      <div className={styles.Content}>
        {icons.length ? (
          <IconPreviewArea
            iconSet={iconSet}
            icons={icons}
            setIcons={setIcons}
          />
        ) : (
          <LandingSection />
        )}
      </div>
      <Footer />
    </div>
  );
}
