const downloadSVG = (name, svg) => {
  const dataStr = "data:text/svg;charset=utf-8," + encodeURIComponent(svg);
  const exportElement = document.createElement("a");
  exportElement.setAttribute("href", dataStr);
  exportElement.setAttribute("download", `${name}.svg`);
  exportElement.click();
};

export default downloadSVG;
