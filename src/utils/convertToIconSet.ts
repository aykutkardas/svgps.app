import svgpath from "svgpath";
import uniq from "lodash.uniq";
import { getFormattedName, parse } from "svgps";
import { nanoid } from "nanoid";
import { IconSetItem } from "src/types";

function clearEmptyAttr(attr) {
  Object.keys(attr).forEach((key) => {
    if (attr[key] === null) {
      delete attr[key];
    }
  });

  return attr;
}

function scaleStrokeWidth(attr, scale) {
  const newAttr = { ...attr };

  if (typeof newAttr.strokeWidth === "number") {
    newAttr.strokeWidth = newAttr.strokeWidth * scale;
  }

  return newAttr;
}

export function convertToSelectionIconFormat(fileName, svg) {
  const newIcon = {
    id: nanoid(),
    name: getFormattedName(fileName),
    ...parse(svg),
  };

  if (!newIcon.paths) return;

  const scale = 1024 / newIcon.width;

  const fills = uniq(newIcon.fills).length === 1 ? [] : newIcon.fills;

  const svgAttrs = clearEmptyAttr(newIcon.svgAttrs);

  Object.keys(svgAttrs).forEach((key) => {
    newIcon.attrs = newIcon.attrs.map((attr, index) => {
      const currentFill = newIcon.fills[index];
      const newAttr = {
        ...attr,
        [key]: svgAttrs[key],
      };

      if (currentFill && key === "fill" && svgAttrs[key] === "none") {
        if (fills.length) {
          newAttr.fill = currentFill;
        } else {
          delete newAttr.fill;
        }
      }

      return newAttr;
    });
  });

  const isSingleStrokeColor =
    uniq(newIcon.attrs.map(({ stroke }) => stroke)).length === 1;

  const attrs =
    newIcon.attrs.map(clearEmptyAttr).map((attr) => {
      const newAttr = scaleStrokeWidth(attr, scale);

      if (isSingleStrokeColor) delete newAttr.stroke;

      return newAttr;
    }) || [];

  fills.forEach((fill, index) => {
    if (attrs[index]) {
      attrs[index] = {
        ...attrs[index],
        fill,
      };
    }
  });

  const iconData = {
    icon: {
      paths: newIcon.paths.map((path) => svgpath(path).scale(scale).toString()),
      attrs,
      width: Math.round(
        (newIcon.height > newIcon.width ? newIcon.height : newIcon.width) *
          scale
      ),
    },
    properties: {
      name: newIcon.name,
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
