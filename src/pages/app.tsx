import Head from "next/head";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";
import IconSetPreview from "src/components/IconSetPreview";

const AppPage = () => (
  <div className="mx-auto flex max-h-screen w-full flex-col p-3">
    <Head>
      <title>SVGPS - Create your own icon collection</title>
    </Head>
    <Header />
    <IconsProvider>
      <DragDropProvider>
        <div className="py-3">
          <IconSetPreview isApp />
        </div>
      </DragDropProvider>
    </IconsProvider>
    <Footer />
  </div>
);

export default AppPage;
