import styles from "./Upload.module.css";

import { useRef } from "react";
import { toast } from "react-toastify";
import { getFormattedName, parse } from "svgps";
import Button from "../Button";

export default function Upload({ setIcons, forceUpdate }) {
  const fileInput = useRef();

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
          content,
          ...parse(content),
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
    <label>
      <input
        className={styles.UploadInput}
        type="file"
        multiple
        ref={fileInput}
        accept="image/svg+xml"
        onChange={handleFileInput}
      />
      <Button onClick={() => fileInput?.current?.click()}>Upload</Button>
    </label>
  );
}
