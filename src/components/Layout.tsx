import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "src/components/Header";
import Footer from "src/components/Footer";

import HomePage from "src/pages/HomePage";
import AppPage from "src/pages/AppPage";
import Store from "src/pages/StorePage";
import IconsDetail from "src/pages/IconsDetailPage";

import ReactGA from "react-ga";
ReactGA.initialize("G-CHZ8XNEG79");

const Layout = () => {
  let location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return (
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
  );
};

export default Layout;
