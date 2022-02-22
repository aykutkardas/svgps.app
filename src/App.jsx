import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "src/components/Header";
import ImportArea from "src/components/ImportArea";
import LandingSection from "./components/LandingSection";
import IconPreviewArea from "./components/IconPreviewArea";
import useForceUpdate from "./utils/useForceUpdate";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [theme, setTheme] = useState("dark");
  const { forceUpdate } = useForceUpdate();

  return (
    <div className="App" data-theme={theme}>
      <ToastContainer />
      <Header theme={theme} setTheme={setTheme} />
      <ImportArea setIcons={setIcons} forceUpdate={forceUpdate} />
      <LandingSection />
      <IconPreviewArea icons={icons} />
    </div>
  );
}
