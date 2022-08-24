import "animate.css";
import "../node_modules/highlight.js/styles/atom-one-dark.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "src/components/Header";
import About from "src/pages/About";
import Icons from "src/pages/Icons";
import { ThemeProvider } from "src/context/themeContext";
import { IconsProvider } from "src/context/iconsContext";

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
        <Toaster toastOptions={toastOptions} position="bottom-right" />
        <Router>
          <div className="container mx-auto p-3 min-h-screen flex flex-col">
            <Header />
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/icons" element={<Icons />} />
            </Routes>
          </div>
        </Router>
      </IconsProvider>
    </ThemeProvider>
  );
}
