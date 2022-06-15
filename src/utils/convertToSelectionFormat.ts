import svgpath from "svgpath";
import uniq from "lodash.uniq";

function convertToSelectionFormat(icons) {
  const icomoonTemplate = {
    generatorSource: "svgps.app",
    IcoMoonType: "selection",
    icons: [],
  };

  icons.forEach((icon) => {
    const scale = 1024 / icon.width;

    const fills = uniq(icon.fills).length === 1 ? [] : icon.fills;
    const attrs = icon.attrs || [];

    fills.forEach((fill, index) => {
      if (attrs[index]) {
        attrs[index] = {
          ...attrs[index],
          fill,
        };
      }
    });

    console.log(attrs);

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
