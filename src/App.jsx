import "react-toastify/dist/ReactToastify.css";

import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";
import Upload from "./components/Upload";
import Download from "./components/Download";
import IconPreviewArea from "./components/IconPreviewArea";
import Header from "./components/Header";

export default function App() {
  const [icons, setIcons] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <div className="container mx-auto">
      <ToastContainer />
      <div className="min-h-screen">
        <Header />
        <div className="mt-20">
          <Upload icons={icons} setIcons={setIcons} forceUpdate={forceUpdate} />
        </div>
      </div>
      
      <div className="min-h-screen py-16">
        <div className="flex justify-center space-x-4">
          <Download icons={icons}>Download All</Download>
          <Download icons={icons}>Download Selected</Download>
        </div>
        <div id="preview" className="mt-10">
          <IconPreviewArea icons={icons} setIcons={setIcons} />
        </div>
      </div>
    </div>
  );
}
