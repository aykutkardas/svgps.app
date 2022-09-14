import IconsApp from "src/components/IconsApp";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";

const AppPage = () => (
  <IconsProvider>
    <DragDropProvider>
      <div className="my-auto py-8">
        <IconsApp />
      </div>
    </DragDropProvider>
  </IconsProvider>
);

export default AppPage;
