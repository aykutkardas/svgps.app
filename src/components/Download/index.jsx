import Button from "src/components/Button";
import convertToSelectionFormat from "src/utils/convertToSelectionFormat";

export default function Download({ icons }) {
  const onClick = () => {
    const formattedIcons = convertToSelectionFormat(icons);

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formattedIcons, null, 2));
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", "selection.json");
    downloadElement.click();
  };

  return <Button onClick={onClick}>Download</Button>;
}
