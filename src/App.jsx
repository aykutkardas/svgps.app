import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import Upload from "./components/Upload";
import Download from "./components/Download";
import IconPreviewArea from "./components/IconPreviewArea";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  console.log({ icons });
  return (
    <div className="App">
      <ToastContainer />
      <Upload icons={icons} setIcons={setIcons} forceUpdate={forceUpdate} />
      <Download icons={icons} />
      <IconPreviewArea icons={icons} setIcons={setIcons} />
    </div>
  );
}
