import { IconSetItem } from "src/types";
import scaleIcon from "./scaleIcon";

const camelCaseToKebabCase = (str) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

const setAttributes = (attrs) =>
  !attrs
    ? ""
    : Object.entries(attrs)
        .map(([key, val]) => `${camelCaseToKebabCase(key)}="${val}"`)
        .join(" ");

export const convertToSVG = ({ icon }: IconSetItem, size = 32, isFile = false): string => {
  const scaledIcon = scaleIcon({ icon, properties: { name: "" } }, size / 1024);
  const fileAttr = !isFile ?  '' : 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';

  const svg = `<svg ${fileAttr} viewbox="0 0 ${scaledIcon.icon.width} ${scaledIcon.icon.width}" width="${scaledIcon.icon.width}" height="${scaledIcon.icon.width}" stroke="currentColor" fill="currentColor">{{paths}}</svg>`;

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
