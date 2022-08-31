import IconSetPreview from "src/components/IconSetPreview";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";

const AppPage = () => (
  <IconsProvider>
    <DragDropProvider>
      <div className="my-auto py-8">
        <IconSetPreview />
      </div>
    </DragDropProvider>
  </IconsProvider>
);

export default AppPage;
