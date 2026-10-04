import type { IconSetItem } from "src/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GuestCollectionStore = {
  guestIcons: IconSetItem[];
  setGuestIcons: (icons: IconSetItem[]) => void;
};

const useGuestCollectionStore = create<GuestCollectionStore>()(
  persist(
    (set) => ({
      guestIcons: [],
      setGuestIcons: (guestIcons) => set(() => ({ guestIcons })),
    }),
    // The storage key and version are part of users' saved data. Changing the
    // state shape requires bumping `version` and adding a `migrate` function.
    { name: "guest-collection", version: 0 },
  ),
);

export default useGuestCollectionStore;
