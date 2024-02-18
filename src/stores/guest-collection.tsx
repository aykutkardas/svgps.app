import { IconSetItem } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GuestCollectionStore = {
  guestIcons: IconSetItem[];
  setGuestIcons: (icons: IconSetItem[]) => void;
};

const useGuestCollectionStore = create<GuestCollectionStore>(
  persist(
    (set) => ({
      guestIcons: [],
      setGuestIcons: (guestIcons) => set(() => ({ guestIcons })),
    }),
    { name: "guest-collection" },
  ) as any,
);

export default useGuestCollectionStore;
