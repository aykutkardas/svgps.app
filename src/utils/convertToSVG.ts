import { IconSetItem } from "src/types";

const setAttributes = (attrs) =>
  Object.entries(attrs)
    .map(([key, val]) => `${key}="${val}"`)
    .join(" ");

export const convertToSVG = (iconSetItem: IconSetItem): string => {
  const svg = `<svg viewbox="0 0 ${iconSetItem.icon.width} 1024" width="${iconSetItem.icon.width}" height="${iconSetItem.icon.width}" style="display: inline-block;" stroke="currentColor" fill="currentColor">{{paths}}</svg>`;

  const paths = iconSetItem.icon.paths
    .map((path, index) =>
      `<path d="${path}" {{attrs}}></path>`.replace(
        "{{attrs}}",
        iconSetItem.icon.attrs
          ? setAttributes(iconSetItem.icon.attrs[index])
          : ""
      )
    )
    .join("");

  return svg.replace("{{paths}}", paths);
};
