export const downloadTS = (name: string, template: string) => {
  const dataStr =
    "data:text/typescript;charset=utf-8," + encodeURIComponent(template);
  const exportElement = document.createElement("a");
  exportElement.setAttribute("href", dataStr);
  exportElement.setAttribute("download", `${name}.d.ts`);
  exportElement.click();
};
