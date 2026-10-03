"use client";

import Header from "src/components/Header";
import { DragDropProvider } from "src/context/DragDropContext";
import CollectionPreview from "src/components/CollectionPreview";
import useGuestCollectionStore from "src/stores/guest-collection";

const CollectionPage = () => {
  const { guestIcons, setGuestIcons } = useGuestCollectionStore();

  return (
    <div className="mx-auto flex h-screen w-full flex-col p-3">
      <Header />
      <DragDropProvider>
        <div className="py-3">
          <CollectionPreview
            iconSet={{ icons: guestIcons }}
            onUpdate={setGuestIcons}
          />
        </div>
      </DragDropProvider>
    </div>
  );
};

export default CollectionPage;
