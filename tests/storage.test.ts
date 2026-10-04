// @vitest-environment jsdom
/**
 * Data users already have in localStorage must keep loading after upgrades
 * (e.g. zustand). These fixtures are copied verbatim from the formats
 * written by the current production build.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const guestIcon = {
  icon: { paths: ["M0 0h1024v1024H0z"], attrs: [{}], width: 1024 },
  properties: { name: "square" },
  __meta: { id: "abc", _selected: false },
};

beforeEach(() => {
  localStorage.clear();
  vi.resetModules();
});

describe("guest-collection (zustand persist v0)", () => {
  it("rehydrates icons saved by the current build", async () => {
    localStorage.setItem(
      "guest-collection",
      JSON.stringify({ state: { guestIcons: [guestIcon] }, version: 0 }),
    );

    const { default: useGuestCollectionStore } = await import(
      "src/stores/guest-collection"
    );

    expect(useGuestCollectionStore.getState().guestIcons).toEqual([guestIcon]);
  });

  it("writes the same format back", async () => {
    const { default: useGuestCollectionStore } = await import(
      "src/stores/guest-collection"
    );

    useGuestCollectionStore.getState().setGuestIcons([guestIcon]);

    expect(JSON.parse(localStorage.getItem("guest-collection")!)).toEqual({
      state: { guestIcons: [guestIcon] },
      version: 0,
    });
  });
});
