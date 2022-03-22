import styles from "./DropZone.module.css";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import extractFiles from "src/components/Upload/extractFiles";

const DropZone = ({ icons, setIcons }) => {
  const onDrop = useCallback((files) => {
    handleFileInput({ target: { files } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileInput = async (event) => {
    const selectedIcons = await extractFiles(event);

    if (selectedIcons.length) {
      setIcons([...icons, ...selectedIcons]);
    }
  };

  return (
    <>
      <input
        className={styles.UploadInput}
        {...getInputProps({
          type: "file",
          multiple: true,
          accept: "image/svg+xml",
        })}
      />
      <div {...getRootProps()} className={styles.DropZone}>
        <p className={styles.DropZoneText}>Drop your SVG or JSON files here</p>
      </div>
    </>
  );
};

export default DropZone;
