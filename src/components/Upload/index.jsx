import styles from "./Upload.module.css";

import { useRef } from "react";

import Button from "src/components/Button";
import extractFiles from "src/utils/extractFiles";

const Upload = ({ icons, setIcons, children }) => {
  const fileInput = useRef();

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
    <label>
      <input
        className={styles.UploadInput}
        ref={fileInput}
        type="file"
        multiple
        accept="image/svg+xml"
        onChange={handleFileInput}
      />
      {children || (
        <Button onClick={() => fileInput?.current?.click()}>Upload</Button>
      )}
    </label>
  );
};

export default Upload;
