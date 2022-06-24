import svgpath from "svgpath";
import uniq from "lodash.uniq";

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

function convertToSelectionFormat(icons) {
  const icomoonTemplate = {
    generatorSource: "svgps.app",
    IcoMoonType: "selection",
    icons: [],
  };

  icons.forEach((icon) => {
    const scale = 1024 / icon.width;

    const fills = uniq(icon.fills).length === 1 ? [] : icon.fills;
    const singleStrokeColor =
      uniq(icon.attrs.map(({ stroke }) => stroke)).length === 1;

    const svgAttrs = clearEmptyAttr(icon.svgAttrs);

    Object.keys(svgAttrs).forEach((key) => {
      icon.attrs = icon.attrs.map((attr) => ({
        ...attr,
        [key]: svgAttrs[key],
      }));
    });

    const attrs =
      icon.attrs.map(clearEmptyAttr).map((attr) => {
        const newAttr = scaleStrokeWidth(attr, scale);

        if (singleStrokeColor) delete newAttr.stroke;

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

    icomoonTemplate.icons.push({
      icon: {
        paths: icon.paths.map((path) => svgpath(path).scale(scale).toString()),
        attrs,
        width: Math.round(
          (icon.height > icon.width ? icon.height : icon.width) * scale
        ),
      },
      properties: {
        name: icon.name,
      },
    });
  });

  return icomoonTemplate;
}

export default convertToSelectionFormat;
