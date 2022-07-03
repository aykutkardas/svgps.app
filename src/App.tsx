import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import lookie from "lookie";

import styles from "./App.module.css";
import "animate.css";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

import HoverScopeAnimation from "src/components/HoverScopeAnimation";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import About from "src/pages/About";
import Icons from "src/pages/Icons";
import { ThemeProvider } from "./context/themeContext";
import isValidIcons from "./utils/isValidIcons";

export default function App() {
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

  const toastOptions = {
    style: {
      background: "var(--neutral-800)",
      color: "var(--neutral-50)",
    },
  };

  return (
    <ThemeProvider>
      <div className={styles.App}>
        <Toaster toastOptions={toastOptions} position="top-right" />
        <HoverScopeAnimation />
        <Router>
          <Header icons={icons} setIcons={setIcons} />
          <div className={styles.Content}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route
                path="/icons"
                element={<Icons icons={icons} setIcons={setIcons} />}
              />
            </Routes>
          </div>
        </Router>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
