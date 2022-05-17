import cx from "classnames";
import styles from "./DialogBox.module.css";

import Button, { ButtonVariants } from "../Button";
import { IconsType } from "src/types";

interface DialogBoxProps {
  setIcons: (icons: IconsType) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: Function;
}
const DialogBox = ({
  setIcons,
  isDialogOpen,
  setIsDialogOpen,
}: DialogBoxProps) => {
  const clearAll = () => {
    setIcons([]);
  };

  return (
    <div
      className={cx(styles.Wrapper, {
        [styles.DialogOpen]: isDialogOpen,
      })}
    >
      <div className={styles.DialogBox}>
        <div className={styles.DialogContent}>
          <div className={styles.DialogText}>Are you sure?</div>
          <div className={styles.DialogButtons}>
            <Button
              variant={ButtonVariants.Ghost}
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={clearAll}>Yes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
