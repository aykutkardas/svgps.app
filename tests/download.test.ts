// @vitest-environment jsdom
import fs from "node:fs";
import path from "node:path";
import { expect, it, vi } from "vitest";

import { downloadAsJSON } from "src/utils/iconActions";

it("downloads selection.json in the IcoMoon format without __meta", () => {
  const fixture = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, "../src/assets/icons/demo/feather.json"),
      "utf8",
    ),
  );
  const icons = fixture.icons.map((icon, i) => ({
    ...icon,
    __meta: { id: `id-${i}`, _selected: true },
  }));

  const click = vi
    .spyOn(HTMLAnchorElement.prototype, "click")
    .mockImplementation(() => {});
  const created: HTMLAnchorElement[] = [];
  const createElement = document.createElement.bind(document);
  vi.spyOn(document, "createElement").mockImplementation((tag: string) => {
    const el = createElement(tag);
    if (tag === "a") created.push(el as HTMLAnchorElement);
    return el;
  });

  downloadAsJSON(icons);

  const [anchor] = created;
  const href = anchor.getAttribute("href")!;
  const prefix = "data:text/json;charset=utf-8,";

  expect(click).toHaveBeenCalledOnce();
  expect(anchor.getAttribute("download")).toBe("selection.json");
  expect(href.startsWith(prefix)).toBe(true);
  // Byte-for-byte what the previous ExportButton produced.
  expect(decodeURIComponent(href.slice(prefix.length))).toBe(
    JSON.stringify(fixture),
  );
  expect(icons[0].__meta).toBeDefined();
});
