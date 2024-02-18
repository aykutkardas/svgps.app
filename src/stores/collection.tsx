import {
  Collection,
  getCollections,
  updateCollection,
} from "src/api/collection";
import { sendToApp } from "src/utils/iconActions";
import { IcomoonIcon } from "svgps";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CollectionStore = {
  collections: Collection[];
  setCollections: (collections: Collection[]) => void;
  fetchCollections: () => void;
  addIconToSelectedCollection: (
    collectionId: string,
    icons: IcomoonIcon[],
  ) => void;
};

const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],

  setCollections: (collections) => {
    set({ collections });
  },

  fetchCollections: async () => {
    const { data: collections } = await getCollections();
    if (collections) set({ collections });
  },

  addIconToSelectedCollection: async (
    collectionId: string,
    icons: IcomoonIcon[],
  ) =>
    set((state) => {
      const collection = state.collections.find((c) => c._id === collectionId);
      if (!collection) return state;

      sendToApp(icons, JSON.parse(collection.icons), (newIcons) => {
        collection.icons = JSON.stringify(newIcons);
        set({ collections: state.collections });
        updateCollection(collectionId, { icons: newIcons });
      });

      return state;
    }),
}));

export default useCollectionStore;
