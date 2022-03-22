import styles from "./Upload.module.css";

import { useRef } from "react";

import Button from "src/components/Button";
import extractFiles from "src/utils/extractFiles";

const Upload = ({ icons, setIcons, children }) => {
  const fileInput = useRef();

  const handleFileInput = async (event) => {
    const selectedIcons = await extractFiles(event);

    if (selectedIcons.length) {
      setIcons([...icons, ...selectedIcons]);
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
