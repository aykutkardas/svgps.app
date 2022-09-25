import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "src/components/Header";
import Footer from "src/components/Footer";

import HomePage from "src/pages/HomePage";
import AppPage from "src/pages/AppPage";
import Store from "src/pages/StorePage";
import IconsDetail from "src/pages/IconsDetailPage";
import PageNotFound from "src/pages/PageNotFound";

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
        <Route path="/store/:iconSet">
          <Route path=":variant" element={<IconsDetail />} />
          <Route path="" element={<IconsDetail />} />
        </Route>
        <Route path="/app" element={<AppPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  </HashRouter>
);

export default App;
