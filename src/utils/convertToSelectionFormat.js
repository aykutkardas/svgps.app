import svgpath from "svgpath";
import _ from "lodash";

function convertToSelectionFormat(icons) {
  const icomoonTemplate = {
    generatorSource: "SVGPS",
    IcoMoonType: "selection",
    icons: [],
  };

  icons.forEach((icon) => {
    const scale = 1024 / icon.width;

    let fills = _.uniq(icon.fills).length === 1 ? [] : icon.fills;

    icomoonTemplate.icons.push({
      icon: {
        paths: icon.paths.map((path) => svgpath(path).scale(scale).toString()),
        attrs: fills.map((fill) => ({ fill })),
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
