import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.css";

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "src/components/Header";
import ImportArea from "src/components/ImportArea";
import LandingSection from "src/components/LandingSection";
import IconPreviewArea from "src/components/IconPreviewArea";
import convertToSelectionFormat from "src/utils/convertToSelectionFormat";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [iconSet, setIconSet] = useState();

  useEffect(() => {
    const formattedIcons = convertToSelectionFormat(icons);
    setIconSet(formattedIcons);
  }, [icons]);

  return (
    <div className={styles.App}>
      <ToastContainer />
      <Header />
      <div className={styles.Content}>
        <ImportArea icons={icons} setIcons={setIcons} />
        {!icons.length ? (
          <LandingSection />
        ) : (
          <IconPreviewArea
            iconSet={iconSet}
            icons={icons}
            setIcons={setIcons}
          />
        )}
      </div>
    </div>
  );
}
