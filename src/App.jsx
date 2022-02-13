import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import DropZoneWrapper from "./components/DropZoneWrapper/DropZoneWrapper";
import Download from "./components/Download";
import IconPreviewArea from "./components/IconPreviewArea";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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
