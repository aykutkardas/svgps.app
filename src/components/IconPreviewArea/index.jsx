import styles from "./IconPreviewArea.module.css";

import IconPreview from "../IconPreview";

const IconPreviewArea = ({ icons, setIcons }) => {
  const selectionCount = icons.filter((icon) => icon._selected).length;
  const checkIsPlural = (iconCount) =>
    `${iconCount} ${iconCount === 1 ? "icon" : "icons"}`;

  return (
    <div className={styles.IconPreviewArea}>
      <div className={styles.SelectionCount}>
        {selectionCount > 0
          ? `${checkIsPlural(selectionCount)} selected`
          : `${checkIsPlural(icons.length)} uploaded`}
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
