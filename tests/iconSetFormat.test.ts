/**
 * The exported selection.json is consumed by react/vue/svelte/preact-icomoon.
 * These tests pin its shape and make sure import -> export is lossless.
 */
import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";

const copied: string[] = [];

vi.mock("copy-to-clipboard", () => ({
  default: (text: string) => copied.push(text),
}));
vi.mock("react-hot-toast", () => {
  const toast = Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
  });
  return { default: toast, toast };
});
vi.mock("nanoid", () => {
  let n = 0;
  return { nanoid: () => `id-${++n}` };
});

import { copyAsJSON, copyAsTypes, sendToApp } from "src/utils/iconActions";
import { extractJSON, extractSVG } from "src/utils/extractFiles";
import type { IconSetItem } from "src/types";

const fixture = fs.readFileSync(
  path.resolve(__dirname, "../src/assets/icons/demo/feather.json"),
  "utf8",
);

beforeEach(() => {
  copied.length = 0;
});

describe("selection.json export", () => {
  it("has the IcoMoon selection shape without internal __meta", () => {
    const icons: IconSetItem[] = [
      {
        icon: { paths: ["M0 0h1024v1024H0z"], attrs: [{}], width: 1024 },
        properties: { name: "square" },
        __meta: { id: "x", _selected: true, content: "<svg/>" },
      },
    ];

    copyAsJSON(icons);

    expect(copied[0]).toMatchInlineSnapshot(`
      "{
        "generatorSource": "svgps.app",
        "IcoMoonType": "selection",
        "icons": [
          {
            "icon": {
              "paths": [
                "M0 0h1024v1024H0z"
              ],
              "attrs": [
                {}
              ],
              "width": 1024
            },
            "properties": {
              "name": "square"
            }
          }
        ]
      }"
    `);
    // copyAsJSON must not mutate the icons held in state.
    expect(icons[0].__meta).toBeDefined();
  });

  it("round-trips an exported file through import unchanged", async () => {
    const imported = await extractJSON(new File([fixture], "feather.json"));
    copyAsJSON(imported);

    expect(JSON.parse(copied[0])).toEqual(JSON.parse(fixture));
  });

  it("generates the IconNames type", () => {
    copyAsTypes([
      { icon: { paths: [] }, properties: { name: "a" } },
      { icon: { paths: [] }, properties: { name: "b-c" } },
    ]);
    expect(copied[0]).toMatchSnapshot();
  });
});

describe("import", () => {
  it("adds fresh __meta to imported JSON icons", async () => {
    const icons = await extractJSON(new File([fixture], "feather.json"));
    expect(icons.length).toBe(JSON.parse(fixture).icons.length);
    for (const icon of icons) {
      expect(icon.__meta).toMatchObject({ _selected: false, content: "" });
    }
  });

  it("parses an SVG file into an icon named after the file", async () => {
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="color:red"><path d="M4 12H20M12 4V20" stroke-width="2" stroke-linecap="round"/></svg>';
    const icon = await extractSVG(new File([svg], "My Plus Icon.svg"));
    expect(icon.properties.name).toBe("my-plus-icon");
    expect(icon.__meta?.content).not.toContain("style=");
    expect({ ...icon, __meta: undefined }).toMatchSnapshot();
  });
});

describe("sendToApp (add to collection)", () => {
  const make = (name: string, d = "M0 0"): IconSetItem => ({
    icon: { paths: [d] },
    properties: { name },
  });

  it("replaces same-named icons and appends new ones", () => {
    const callback = vi.fn();
    sendToApp([make("a", "M1 1"), make("c")], [make("a"), make("b")], callback);
    const result = callback.mock.calls[0][0];
    expect(result.map((i) => i.properties.name)).toEqual(["a", "b", "c"]);
    expect(result[0].icon.paths).toEqual(["M1 1"]);
  });

  it("does nothing when every icon already exists", () => {
    const callback = vi.fn();
    sendToApp([make("a")], [make("a")], callback);
    expect(callback).not.toHaveBeenCalled();
  });
});

describe("copyText", () => {
  it("shows an error instead of success when copying fails", async () => {
    const { default: toast } = await import("react-hot-toast");
    const { copyText } = await import("src/utils/copyText");
    const { default: copy } = await import("copy-to-clipboard");
    vi.mocked(toast.success).mockClear();
    vi.mocked(toast.error).mockClear();

    const failing = vi.fn(async () => false);
    vi.spyOn(await import("copy-to-clipboard"), "default").mockImplementation(
      failing as unknown as typeof copy,
    );

    expect(await copyText("x", "Copied!")).toBe(false);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Could not copy to clipboard");
  });
});
