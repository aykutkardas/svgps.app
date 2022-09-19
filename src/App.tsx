import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";

const App = () => {
  return (
    <HashRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className:
            "bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50",
        }}
      />
      <Layout />
    </HashRouter>
  );
};

export default App;
