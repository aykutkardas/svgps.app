import styles from "./ImportArea.module.css";

import DropZone from "src/components/DropZone";
import Button from "src/components/Button";
import Upload from "src/components/Upload";

const ImportArea = ({ setIcons }) => (
  <>
    <DropZone />
    <div className={styles.Container}>
      <span className={styles.Line}>
        <p>
          <span>or</span>
        </p>
      </span>
      <div className={styles.ButtonWrapper}>
        <Upload setIcons={setIcons} />
      </div>
      <div className={styles.ButtonWrapper}>
        <Button>Paste</Button>
      </div>
    </div>
  </>
);

export default ImportArea;
