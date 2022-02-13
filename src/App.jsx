import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Header from "src/components/Header";
import ImportArea from "src/components/ImportArea";

export default function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <ImportArea />
    </div>
  );
}
