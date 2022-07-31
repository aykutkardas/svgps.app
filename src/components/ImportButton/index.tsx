import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ImportWrapper from "src/components/ImportWrapper";
import Button, { ButtonVariants } from "src/components/Button";
import Dialog from "src/components/Dialog";
import Icon from "src/components/Icon";

import styles from "./ImportButton.module.css";

const ImportButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDialog = () => {
    navigate("/icons");
    setIsDialogOpen(!isDialogOpen);
  };

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

      <Dialog
        hideButtons={true}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        <div className={styles.ImportDialogContent}>
          <span>
            Do you want to import SVG files to the set or import a JSON file?
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
      </Dialog>
    </>
  );
};

export default ImportButton;
