import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { getFormattedName, getPaths } from "svgps";
import Icon from "../Icon";
import "./Upload.scss";

export default function Upload({ setIcons, icons, forceUpdate }) {
  const fileInput = useRef();
  const [status, setStatus] = useState();

  const handleFileInput = async (event) => {
    const selectedIcons = [];
    if (window.FileList && window.File && window.FileReader) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        const blob = new Blob([file], { type: "text/svg" });

        if (file && !file.type) {
          toast.dark(
            "Error: The File.type property does not appear to be supported on this browser."
          );
          continue;
        }

        if (file.type !== "image/svg+xml") {
          toast.dark("Error: The selected file does not appear to be an svg.");
          continue;
        }

        const content = await blob.text();

        selectedIcons.push({
          name: getFormattedName(file.name),
          paths: getPaths(content),
          content,
        });

        setIcons(selectedIcons);
        forceUpdate();
      }
      if (selectedIcons.length) {
        toast.success("Upload succesfull!");
      }
    }
  };

  return (
    <label className="Upload">
      <input
        className="UploadInput"
        type="file"
        multiple
        ref={fileInput}
        onChange={handleFileInput}
      />
      <span className="UploadButton">
        <span className="UploadIcon">
          <Icon icon="upload" size={20} />
        </span>
        <span className="UploadLabel">
          {icons.length ? `Selected ${icons.length} files` : "Select SVG Files"}
        </span>
      </span>
    </label>
  );
}
