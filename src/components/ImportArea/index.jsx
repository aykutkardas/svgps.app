import styles from "./ImportArea.module.css";

import DropZone from "src/components/DropZone";
import UploadWrapper from "src/components/UploadWrapper";
import Button from "src/components/Button";

const ImportArea = ({ icons, setIcons }) => (
  <>
    <DropZone icons={icons} setIcons={setIcons} />
    <div className={styles.Container}>
      <div className={styles.Line}>
        <span>or</span>
      </div>
      <div className={styles.ButtonWrapper}>
        <UploadWrapper icons={icons} setIcons={setIcons}>
          <Button>Upload</Button>
        </UploadWrapper>
      </div>
    </div>
  </>
);

export default ImportArea;
