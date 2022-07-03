import { useState } from "react";

import ImportWrapper from "src/components/ImportWrapper";
import Button, { ButtonVariants } from "src/components/Button";
import DialogBox from "src/components/DialogBox";
import Icon from "src/components/Icon";

import styles from "./ImportButton.module.css";

const ImportButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  return (
    <>
      <Button onClick={toggleDialog} className={styles.ImportButton}>
        <span className={styles.ImportButtonText}>Import</span>
        <Icon
          className={styles.ImportButtonIcon}
          icon="import"
          size={22}
          removeInlineStyle={true}
        />
      </Button>

      <DialogBox
        hideButtons={true}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        <div className={styles.ImportDialogContent}>
          <span>
            Want to get a new icon set or add new svg files to your existing
            set?
          </span>
          <div className={styles.ImportDialogContentButtons}>
            <Button variant={ButtonVariants.Ghost} onClick={toggleDialog}>
              Close
            </Button>
            <ImportWrapper onComplete={toggleDialog}>
              <Button>Import SVG Files</Button>
            </ImportWrapper>
            <ImportWrapper onComplete={toggleDialog} type="JSON">
              <Button>Import JSON</Button>
            </ImportWrapper>
          </div>
        </div>
      </DialogBox>
    </>
  );
};

export default ImportButton;
