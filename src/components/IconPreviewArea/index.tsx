import { useState } from "react";

import styles from "./IconPreviewArea.module.css";

import IconPreview from "src/components/IconPreview";
import Button, { ButtonVariants } from "src/components/Button";
import Download from "src/components/Download";
import AddIcon from "src/components/AddIcon";
import DialogBox from "../DialogBox";
import { IconSet, IconsType } from "src/types";

interface IconPreviewAreaProps {
  icons: IconsType;
  iconSet: IconSet;
  setIcons: (icons: IconsType) => void;
}

const IconPreviewArea = ({
  icons,
  setIcons,
  iconSet,
}: IconPreviewAreaProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const selectedIcons = icons.filter((icon) => icon._selected);
  const selectionCount = selectedIcons.length;

  const clearAll = () => {
    setIcons([]);
  };

  const checkIsPlural = (iconCount) =>
    `${iconCount} ${iconCount === 1 ? "icon" : "icons"}`;

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
      <DialogBox
        onConfirm={clearAll}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        Are you sure?
      </DialogBox>
      <div className={styles.Actions}>
        <Button
          variant={ButtonVariants.Ghost}
          onClick={() => setIsDialogOpen(true)}
        >
          Clear All
        </Button>
        {selectionCount > 0 && (
          <Download variant={ButtonVariants.Secondary} icons={selectedIcons}>
            Export Selected ({selectionCount})
          </Download>
        )}
        <Download icons={icons}>Export All</Download>
      </div>
    </div>
  );
};

export default IconPreviewArea;
