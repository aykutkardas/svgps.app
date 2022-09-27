import Head from "next/head";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import IconsApp from "src/components/IconsApp";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";

const AppPage = () => (
  <div className="mx-auto flex max-h-screen w-full flex-col p-3">
    <Head>
      <title>SVGPS - Create your own icon collection</title>
    </Head>
    <Header />
    <IconsProvider>
      <DragDropProvider>
        <div className="py-3">
          <IconsApp />
        </div>
      </DragDropProvider>
    </IconsProvider>
    <Footer />
  </div>
);

export default AppPage;
