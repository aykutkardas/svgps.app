import styles from "./DropZone.module.css";

const DropZone = () => (
  <div className={styles.DropZone}>
    <p className={styles.DropZoneText}>Drop your SVG or JSON files here</p>
  </div>
);

export default DropZone;
