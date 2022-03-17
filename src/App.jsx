import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.css";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "src/components/Header";
import ImportArea from "src/components/ImportArea";
import LandingSection from "./components/LandingSection";
import IconPreviewArea from "./components/IconPreviewArea";

export default function App() {
  const [icons, setIcons] = useState([]);

  return (
    <div className={styles.App}>
      <ToastContainer />
      <Header />
      <div className={styles.Content}>
        <ImportArea icons={icons} setIcons={setIcons} />
        {!icons.length ? (
          <LandingSection />
        ) : (
          <IconPreviewArea icons={icons} setIcons={setIcons} />
        )}
      </div>
    </div>
  );
}
