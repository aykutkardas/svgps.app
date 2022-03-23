import styles from "./DropZone.module.css";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import extractFiles from "src/utils/extractFiles";

const DropZone = ({ icons, setIcons }) => {
  const onDrop = useCallback((files) => {
    handleFileInput({ target: { files } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleFileInput = async (event) => {
    const selectedIcons = await extractFiles(event);

    if (selectedIcons.length) {
      const oldIcons = [...icons].map((icon) => {
        const matchedIcon = selectedIcons.find(
          (selectedIcon) => selectedIcon.name === icon.name
        );
        if (matchedIcon) {
          return matchedIcon;
        }
        return icon;
      });

      const newIcons = selectedIcons.filter(
        (selectedIcon) =>
          !oldIcons.find((oldIcon) => oldIcon.name === selectedIcon.name)
      );

      setIcons([...oldIcons, ...newIcons]);
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
