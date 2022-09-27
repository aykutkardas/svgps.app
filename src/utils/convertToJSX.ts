import { IconSetItem } from "src/types";
import scaleIcon from "./scaleIcon";

const setAttributes = (attrs) =>
  Object.entries(attrs)
    .map(([key, val]) => `${key}="${val}"`)
    .join(" ");

export const convertToJSX = ({ icon }: IconSetItem, size = 32): string => {
  const scaledIcon = scaleIcon({ icon, properties: { name: "" } }, size / 1024);

  const svg = `<svg viewbox="0 0 ${scaledIcon.icon.width} ${scaledIcon.icon.width}" width="${scaledIcon.icon.width}" height="${scaledIcon.icon.width}" stroke="currentColor" fill="currentColor">{{paths}}</svg>`;

  const paths = scaledIcon.icon.paths
    .map((path, index) =>
      `<path d="${path}" {{attrs}} />`.replace(
        "{{attrs}}",
        scaledIcon.icon.attrs ? setAttributes(scaledIcon.icon.attrs[index]) : ""
      )
    )
    .join("");

  return svg.replace("{{paths}}", paths);
};
