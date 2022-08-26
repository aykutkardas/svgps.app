import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "src/components/Header";
import About from "src/pages/About";
import Icons from "src/pages/Icons";
import { ThemeProvider } from "src/context/themeContext";
import { IconsProvider } from "src/context/iconsContext";

export default function App() {
  return (
    <ThemeProvider>
      <IconsProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50",
          }}
        />
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
