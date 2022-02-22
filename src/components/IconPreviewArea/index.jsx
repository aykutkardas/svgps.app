import styles from "./IconPreviewArea.module.css";

import IconPreview from "../IconPreview";

const IconPreviewArea = ({ icons, setIcons }) => (
  <div className={styles.IconPreviewArea}>
    <div className={styles.IconList}>
      {icons.map((icon) => (
        <IconPreview key={icon} icon={icon} icons={icons} setIcons={setIcons} />
      ))}
    </div>
  </div>
);

export default IconPreviewArea;
