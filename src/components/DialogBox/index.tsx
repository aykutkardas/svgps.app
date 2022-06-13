import cx from "classnames";
import styles from "./DialogBox.module.css";

import Button, { ButtonVariants } from "../Button";

const DialogBox = ({ children, onConfirm, isOpen, setIsOpen }) => (
  <div
    className={cx(styles.Overlay, {
      [styles.DialogOpen]: isOpen,
    })}
  >
    <div className={styles.DialogBox}>
      <div className={styles.DialogContent}>
        <div className={styles.DialogText}>{children}</div>
        <div className={styles.DialogButtons}>
          <Button
            variant={ButtonVariants.Ghost}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm}>Yes</Button>
        </div>
      </div>
    </div>
  </div>
);

export default DialogBox;
