import { IconSetItem } from "src/types";

const camelCaseToKebabCase = (str) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

const setAttributes = (attrs) =>
  Object.entries(attrs)
    .map(([key, val]) => `${camelCaseToKebabCase(key)}="${val}"`)
    .join(" ");

export const convertToSVG = ({ icon }: IconSetItem): string => {
  const svg = `<svg viewbox="0 0 ${icon.width} 1024" width="${icon.width}" height="${icon.width}" stroke="currentColor" fill="currentColor">{{paths}}</svg>`;

  const paths = icon.paths
    .map((path, index) =>
      `<path d="${path}" {{attrs}} />`.replace(
        "{{attrs}}",
        icon.attrs ? setAttributes(icon.attrs[index]) : ""
      )
    )
    .join("");

  return svg.replace("{{paths}}", paths);
};
