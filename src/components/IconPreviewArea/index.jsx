import styles from "./IconPreviewArea.module.css";

import IconPreview from "src/components/IconPreview";
import Button from "src/components/Button";
import Download from "src/components/Download";
import AddIcon from "src/components/AddIcon";

const IconPreviewArea = ({ icons, setIcons, iconSet }) => {
  const selectedIcons = icons.filter((icon) => icon._selected);
  const selectionCount = selectedIcons.length;

  const checkIsPlural = (iconCount) =>
    `${iconCount} ${iconCount === 1 ? "icon" : "icons"}`;

  const clearAll = () => {
    const isConfirm = window.confirm("Are you sure?");
    if (isConfirm) {
      setIcons([]);
    }
  };

  return (
    <div className={styles.IconPreviewArea}>
      <div className={styles.SelectionCount}>
        {`${checkIsPlural(icons.length)} uploaded`}
      </div>
      <div className={styles.IconList}>
        {icons.map((icon) => (
          <IconPreview
            key={icon.id}
            icon={icon}
            icons={icons}
            setIcons={setIcons}
            iconSet={iconSet}
          />
        ))}
        <AddIcon icons={icons} setIcons={setIcons} />
      </div>
      <div className={styles.Actions}>
        <Button variant="ghost" onClick={clearAll}>
          Clear All
        </Button>
        {selectionCount > 0 && (
          <Download icons={selectedIcons}>
            Export Selected ({selectionCount})
          </Download>
        )}
        <Download icons={icons}>Export All</Download>
      </div>
    </div>
  );
};

export default IconPreviewArea;
