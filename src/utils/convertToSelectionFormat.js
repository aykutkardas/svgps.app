import svgpath from "svgpath";

function convertToSelectionFormat(icons) {
  const icomoonTemplate = {
    generatorSource: "SVGPS",
    IcoMoonType: "selection",
    icons: [],
  };

  icons.forEach((icon) => {
    const scale = 1024 / icon.width;

    icomoonTemplate.icons.push({
      icon: {
        paths: icon.paths.map((path) => svgpath(path).scale(scale).toString()),
        attrs: icon.fills.map((fill) => ({ fill })),
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
