import convertToSelectionFormat from "../../utils/convertToSelectionFormat";
import Button from "../Button";

export default function Download({ icons, children }) {
  const onClick = () => {
    const formattedIcons = convertToSelectionFormat(icons);

    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formattedIcons, null, 2));
    var downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", "selection.json");
    downloadElement.click();
  };

  return icons.length ? (
    <Button onClick={onClick}>
      {children}
    </Button>
  ) : null;
}
