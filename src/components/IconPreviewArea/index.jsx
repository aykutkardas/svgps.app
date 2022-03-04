import styles from "./IconPreviewArea.module.css";

import IconPreview from "../IconPreview";
import Button from "../Button";
import Download from "../Download";

const IconPreviewArea = ({ icons, setIcons }) => {
  const selectionCount = icons.filter((icon) => icon._selected).length;

  const checkIsPlural = (iconCount) =>
    `${iconCount} ${iconCount === 1 ? "icon" : "icons"}`;

  const clearAll = () => {
    setIcons([]);
  };

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
      <div className={styles.Actions}>
        <Download icons={icons}>Download All</Download>
        {selectionCount > 0 && (
          <Download icons={icons.filter((i) => i._selected)}>
            Download Selected
          </Download>
        )}
        <Button onClick={clearAll}>Clear All</Button>
      </div>
    </div>
  );
};

export default IconPreviewArea;
