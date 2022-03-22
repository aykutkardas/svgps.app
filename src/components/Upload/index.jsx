import styles from "./Upload.module.css";

import { useCallback, useRef } from "react";
import { toast } from "react-toastify";
import { getFormattedName, parse } from "svgps";
import { nanoid } from "nanoid";
import Button from "../Button";
import { useDropzone } from "react-dropzone";

const Upload = ({ icons, setIcons, children }) => {
  const fileInput = useRef();

  const onDrop = useCallback((files) => {
    handleFileInput({ target: { files } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
          id: nanoid(),
          name: getFormattedName(file.name),
          content,
          ...parse(content),
        });
      }

      if (selectedIcons.length) {
        setIcons([...icons, ...selectedIcons]);
        toast.success("Upload succesfull!");
      }
    }
  };

  const dropzoneProps = children ? {} : getRootProps();

  return (
    <label {...dropzoneProps}>
      <input
        className={styles.UploadInput}
        ref={fileInput}
        onChange={handleFileInput}
        {...getInputProps({
          type: "file",
          multiple: true,
          accept: "image/svg+xml",
        })}
      />
      {children || (
        <Button onClick={() => fileInput?.current?.click()}>Upload</Button>
      )}
    </label>
  );
};

export default Upload;
