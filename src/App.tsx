import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "src/components/Header";
import { ThemeProvider } from "src/context/themeContext";
import { IconsProvider } from "src/context/iconsContext";

import HomePage from "src/pages/HomePage";
import AppPage from "src/pages/AppPage";

const App = () => (
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
        <div className="container mx-auto flex min-h-screen flex-col p-3">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/app" element={<AppPage />} />
          </Routes>
        </div>
      </Router>
    </IconsProvider>
  </ThemeProvider>
);

export default App;
