import styles from "./IconPreviewArea.module.css";

import IconPreview from "../IconPreview";

const IconPreviewArea = ({ icons, setIcons }) => {
  const selectedCount = icons.filter((icon) => icon._selected).length;

  return (
    <div className={styles.IconPreviewArea}>
      <div className={styles.SelectedCount}>
        {selectedCount > 0
          ? `${selectedCount} icon selected`
          : `${icons.length} icon uploaded`}
      </div>
      <div className={styles.IconList}>
        {icons.map((icon) => (
          <IconPreview
            key={icon.content}
            icon={icon}
            icons={icons}
            setIcons={setIcons}
          />
        ))}
      </div>
    </div>
  );
};

export default IconPreviewArea;
