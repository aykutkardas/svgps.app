import { useHotkeys } from "react-hotkeys-hook";
import cx from "classnames";

import Button, { ButtonVariants } from "src/components/Button";

import styles from "./DialogBox.module.css";

interface DialogBoxProps {
  onConfirm?: () => void;
  hideButtons?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const DialogBox = ({
  children,
  hideButtons,
  isOpen,
  setIsOpen,
  onConfirm,
}: DialogBoxProps) => {
  useHotkeys("esc", () => setIsOpen(false));

  return (
    <div
      className={cx(styles.Overlay, {
        [styles.DialogOpen]: isOpen,
      })}
    >
      <div className={styles.DialogBox}>
        <div className={styles.DialogContent}>
          <div className={styles.DialogText}>{children}</div>
          {!hideButtons && (
            <div className={styles.DialogButtons}>
              <Button
                variant={ButtonVariants.Ghost}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={onConfirm}>Yes</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DialogBox;
