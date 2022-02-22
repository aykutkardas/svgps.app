import styles from "./IconPreviewArea.module.css";

import IconPreview from "../IconPreview";

export default function IconPreviewArea({ icons, setIcons }) {
  return (
    <div className={styles.IconPreviewArea}>
      <div className={styles.IconList}>
        {icons.map((icon) => (
          <IconPreview icon={icon} icons={icons} setIcons={setIcons} />
        ))}
      </div>
    </div>
  );
}
