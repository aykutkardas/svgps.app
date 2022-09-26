import Head from "next/head";

import IconsApp from "src/components/IconsApp";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";

const AppPage = () => (
  <IconsProvider>
    <Head>
      <title>SVGPS - Create your own icon collection</title>
    </Head>
    <DragDropProvider>
      <div className="my-auto py-8">
        <IconsApp />
      </div>
    </DragDropProvider>
  </IconsProvider>
);

export default AppPage;
