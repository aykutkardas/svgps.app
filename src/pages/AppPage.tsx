import { Helmet } from "react-helmet";

import IconsApp from "src/components/IconsApp";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";

const AppPage = () => (
  <IconsProvider>
    <Helmet>
      <title>SVGPS - Create your own icon collection</title>
    </Helmet>
    <DragDropProvider>
      <div className="my-auto py-8">
        <IconsApp />
      </div>
    </DragDropProvider>
  </IconsProvider>
);

export default AppPage;
