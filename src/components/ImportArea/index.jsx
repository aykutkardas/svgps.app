import styles from "./ImportArea.module.css";

import DropZone from "src/components/DropZone";
import Upload from "src/components/Upload";

const ImportArea = ({ icons, setIcons }) => (
  <>
    <DropZone icons={icons} setIcons={setIcons} />
    <div className={styles.Container}>
      <span className={styles.Line}>
        <p>
          <span>or</span>
        </p>
      </span>
      <div className={styles.ButtonWrapper}>
        <Upload icons={icons} setIcons={setIcons} />
      </div>
    </div>
  </>
);

export default ImportArea;
