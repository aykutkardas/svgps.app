function convertToSelectionFormat(icons) {
  const icomoonTemplate = {
    IcoMoonType: "selection",
    icons: [],
  };

  icons.forEach((icon) => {
    icomoonTemplate.icons.push({
      icon: {
        paths: [icon.paths],
        attrs: [],
      },
      properties: {
        name: icon.name,
      },
    });
  });

  return icomoonTemplate;
}

export default convertToSelectionFormat;
