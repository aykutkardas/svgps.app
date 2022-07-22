import { parse } from "svgps";
import { nanoid } from "nanoid";

import { IconSet, IconSetItem } from "src/types";
import toSlug from "src/utils/toSlug";

export const convertToSelectionIconFormat = (
  fileName: string,
  svg: string
): IconSetItem => ({
  ...parse(svg, { template: "icomoon" }),
  properties: {
    name: toSlug(fileName),
  },
  __meta: {
    content: svg,
    id: nanoid(),
  },
});

export const convertToIconSet = (icons: IconSetItem[]): IconSet => ({
  generatorSource: "svgps.app",
  IcoMoonType: "selection",
  icons,
});
