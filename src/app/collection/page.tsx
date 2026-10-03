"use client";

import Header from "src/components/Header";
import { DragDropProvider } from "src/context/DragDropContext";
import CollectionPreview from "src/components/CollectionPreview";
import useGuestCollectionStore from "src/stores/guest-collection";

const CollectionPage = () => {
  const { guestIcons, setGuestIcons } = useGuestCollectionStore();

  return (
    <div className="mx-auto flex h-dvh w-full flex-col px-3 sm:px-6">
      <Header />
      <DragDropProvider>
        <div className="min-h-0 flex-1 pb-3 sm:pb-6">
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
