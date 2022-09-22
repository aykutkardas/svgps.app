import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ReactGA from "react-ga4";

import Header from "src/components/Header";
import Footer from "src/components/Footer";

import HomePage from "src/pages/HomePage";
import AppPage from "src/pages/AppPage";
import Store from "src/pages/StorePage";
import IconsDetail from "src/pages/IconsDetailPage";

ReactGA.initialize("G-CHZ8XNEG79");

const App = () => (
  <HashRouter>
    <Toaster
      position="bottom-right"
      toastOptions={{
        className:
          "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50",
      }}
    />
    <div className="container mx-auto flex min-h-screen flex-col p-3">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:iconSet" element={<IconsDetail />} />
        <Route path="/app" element={<AppPage />} />
      </Routes>
      <Footer />
    </div>
  </HashRouter>
);

export default App;
