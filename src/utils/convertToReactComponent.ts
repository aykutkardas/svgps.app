import { IconSetItem } from "src/types";
import scaleIcon from "./scaleIcon";

export const toPascalCase = (text) =>
  text.replace(/(^\w|-\w)/g, clearAndUpper).replace(/^(\d)/, "_$1");

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

const setAttributes = (attrs) =>
  !attrs
    ? ""
    : Object.entries(attrs)
        .map(([key, val]) => `${key}="${val}"`)
        .join(" ");

export const convertToReactComponent = (
  { icon }: IconSetItem,
  size = 16,
  name
): string => {
  const scaledIcon = scaleIcon({ icon, properties: { name } }, size / 1024);

  const componentContent =
    "" +
    `export default function ${toPascalCase(name)}(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 ${size} ${size}" {...props}>{{paths}}</svg>
  )
};`;

  const paths = scaledIcon.icon.paths
    .map((path, index) =>
      `<path d="${path}" {{attrs}} />`.replace(
        "{{attrs}}",
        scaledIcon.icon.attrs ? setAttributes(scaledIcon.icon.attrs[index]) : ""
      )
    )
    .join("\n");

  return componentContent.replace("{{paths}}", paths);
};
