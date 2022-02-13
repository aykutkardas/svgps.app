import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import DropZoneWrapper from "./components/DropZoneWrapper/DropZoneWrapper";
import Download from "./components/Download";
import IconPreviewArea from "./components/IconPreviewArea";

export default function App() {
  const [icons, setIcons] = useState([]);

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <DropZoneWrapper />
      <Download icons={icons} />
      <IconPreviewArea icons={icons} setIcons={setIcons} />
    </div>
  );
}
