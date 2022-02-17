import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "src/components/Header";
import ImportArea from "src/components/ImportArea";
import IconPreviewArea from "./components/IconPreviewArea";
import useForceUpdate from "./utils/useForceUpdate";

export default function App() {
  const [icons, setIcons] = useState([]);
  const { forceUpdate } = useForceUpdate();

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <ImportArea setIcons={setIcons} forceUpdate={forceUpdate} />
      <IconPreviewArea icons={icons} />
    </div>
  );
}
