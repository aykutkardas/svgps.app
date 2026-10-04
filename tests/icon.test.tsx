import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import Icon from "src/components/Icon";
import type { IconSet } from "src/types";

const iconSet: IconSet = {
  icons: [
    {
      icon: {
        paths: ["M0 0h1024v1024H0z"],
        attrs: [{ fillRule: "evenodd", fill: "red", pId: "14735", t: "1" }],
        width: 1024,
      },
      properties: { name: "square" },
    },
  ],
};

afterEach(() => vi.restoreAllMocks());

describe("Icon", () => {
  it("drops attributes React cannot render without touching the data", () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const html = renderToStaticMarkup(<Icon iconSet={iconSet} icon="square" />);

    expect(html).toContain('fill-rule="evenodd"');
    expect(html).toContain('fill="red"');
    expect(html).toContain('t="1"');
    expect(html).not.toMatch(/pid/i);
    expect(error).not.toHaveBeenCalled();
    expect(iconSet.icons[0].icon.attrs?.[0]).toHaveProperty("pId", "14735");
  });

  it("renders nothing for an unknown icon", () => {
    expect(renderToStaticMarkup(<Icon iconSet={iconSet} icon="nope" />)).toBe(
      "",
    );
  });

  it("still renders the app's own icons", () => {
    expect(renderToStaticMarkup(<Icon icon="package" />)).toContain("<path");
  });
});
