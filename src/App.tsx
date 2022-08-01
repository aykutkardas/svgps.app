import "animate.css";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HoverScopeAnimation from "src/components/HoverScopeAnimation";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import About from "src/pages/About";
import Icons from "src/pages/Icons";
import { ThemeProvider } from "src/context/themeContext";
import { IconsProvider } from "src/context/iconsContext";

import styles from "./App.module.css";

export default function App() {
  const toastOptions = {
    style: {
      background: "var(--neutral-800)",
      color: "var(--neutral-50)",
    },
  };

  return (
    <ThemeProvider>
      <IconsProvider>
        <div className={styles.App}>
          <Toaster toastOptions={toastOptions} position="bottom-right" />
          <HoverScopeAnimation />
          <Router>
            <Header />
            <div className={styles.Content}>
              <Routes>
                <Route path="/" element={<About />} />
                <Route path="/icons" element={<Icons />} />
              </Routes>
            </div>
          </Router>
          <Footer />
        </div>
        <iframe
          className={styles.Sponsor}
          src="https://github.com/sponsors/aykutkardas/button"
          title="Sponsor aykutkardas"
          height={35}
          width={116}
          style={{ border: 0 }}
        />
      </IconsProvider>
    </ThemeProvider>
  );
}
