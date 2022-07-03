import { useContext, useState } from "react";

import styles from "./IconPreviewArea.module.css";

import IconPreview from "src/components/IconPreview";
import Button, { ButtonVariants } from "src/components/Button";
import Download from "src/components/Download";
import AddIcon from "src/components/AddIcon";
import DialogBox from "src/components/DialogBox";
import { IconsContext } from "src/context/iconsContext";
import ImportButton from "../ImportButton";

const IconPreviewArea = () => {
  const { icons, setIcons } = useContext(IconsContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const hasIcons = icons.length;

  const clearAll = () => {
    setIcons([]);
    setIsDialogOpen(false);
  };

  const checkIsPlural = (iconCount) =>
    `${iconCount} ${iconCount === 1 ? "icon" : "icons"}`;

  return hasIcons ? (
    <div className={styles.IconPreviewArea}>
      <div className={styles.SelectionCount}>
        {`${checkIsPlural(icons.length)} imported`}
      </div>
      <div className={styles.IconList}>
        {icons.map((icon) => (
          <IconPreview key={icon.__meta?.id} icon={icon} />
        ))}
        <AddIcon />
      </div>
      <DialogBox
        onConfirm={clearAll}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        Are you sure you want to remove all icons?
      </DialogBox>
      <div className={styles.Actions}>
        <Button
          variant={ButtonVariants.Ghost}
          onClick={() => setIsDialogOpen(true)}
        >
          Remove All
        </Button>
        {selectionCount > 0 && (
          <Download variant={ButtonVariants.Secondary} icons={selectedIcons}>
            Export Selected ({selectionCount})
          </Download>
        )}
        <Download icons={icons}>Export All</Download>
      </div>
    </div>
  ) : (
    <div className={styles.NoIcon}>
      <span>No icons to show</span>
      <ImportButton />
    </div>
  );
};

export default IconPreviewArea;
