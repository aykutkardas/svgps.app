function convertToSelectionFormat(icons) {
  const icomoonTemplate = {
    IcoMoonType: "selection",
    icons: [],
  };

  icons.forEach((icon) => {
    icomoonTemplate.icons.push({
      icon: {
        paths: icon.paths,
        attrs: icon.fills.map((fill) => ({
          fill,
        })),
        width: icon.width,
      },
      properties: {
        name: icon.name,
      },
    });
  });

  return icomoonTemplate;
}

export default convertToSelectionFormat;
