import Icon from "../Icon";
import convertToSelectionFormat from "../../utils/convertToSelectionFormat";
import "./Download.scss";

export default function Download({ icons }) {
  const onClick = () => {
    const formattedIcons = convertToSelectionFormat(icons);

    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formattedIcons));
    var downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", "selection.json");
    downloadElement.click();
  };

  return icons.length ? (
    <button className="Download" onClick={onClick}>
      <span className="DownloadIcon">
        <Icon icon="download" size={20} />
      </span>
      Download
    </button>
  ) : null;
}
