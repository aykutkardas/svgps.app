import { useState } from "react";

import styles from "./IconPreviewArea.module.css";

import IconPreview from "src/components/IconPreview";
import Button, { ButtonVariants } from "src/components/Button";
import Download from "src/components/Download";
import AddIcon from "src/components/AddIcon";
import DialogBox from "src/components/DialogBox";
import ImportWrapper from "src/components/ImportWrapper";
import { IconSetItem } from "src/types";

interface IconPreviewAreaProps {
  icons: IconSetItem[];
  setIcons: (icons: IconSetItem[]) => void;
}

const IconPreviewArea = ({ icons, setIcons }: IconPreviewAreaProps) => {
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
          <IconPreview
            key={icon.__meta?.id}
            icon={icon}
            icons={icons}
            setIcons={setIcons}
          />
        ))}
        <AddIcon icons={icons} setIcons={setIcons} />
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
      <ImportWrapper icons={icons} setIcons={setIcons}>
        <Button>Import</Button>
      </ImportWrapper>
    </div>
  );
};

export default IconPreviewArea;
