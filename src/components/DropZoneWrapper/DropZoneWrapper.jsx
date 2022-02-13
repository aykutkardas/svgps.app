import styles from "./DropZoneWrapper.module.css";

import DropZone from "../DropZone/DropZone";
import Button from "../Button/Button";

const DropZoneWrapper = () => (
  <>
    <DropZone />
    <div className={styles.Container}>
      <span className={styles.Line}>
        <p>
          <span>or</span>
        </p>
      </span>
      <div className={styles.Button}>
        <Button>Upload</Button>
      </div>
      <div className={styles.Button}>
        <Button>Paste</Button>
      </div>
    </div>
  </>
);

export default DropZoneWrapper;
