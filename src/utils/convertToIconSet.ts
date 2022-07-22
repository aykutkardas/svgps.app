import { convertToIcomoonFormat, getFormattedName, parse } from "svgps";
import { nanoid } from "nanoid";
import { IconSetItem } from "src/types";

export function convertToSelectionIconFormat(fileName, svg) {
  const iconData = {
    ...convertToIcomoonFormat(parse(svg)),
    properties: {
      name: getFormattedName(fileName),
    },
    __meta: {
      content: svg,
      id: nanoid(),
    },
  };

  return iconData;
}

function convertToIconSet(icons: IconSetItem[]) {
  return {
    generatorSource: "svgps.app",
    IcoMoonType: "selection",
    icons,
  };
}

export default convertToIconSet;
