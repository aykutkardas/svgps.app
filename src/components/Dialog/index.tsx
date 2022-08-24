import { useHotkeys } from "react-hotkeys-hook";

import Button, { ButtonVariants } from "src/components/Button";

interface DialogProps {
  onConfirm?: () => void;
  hideButtons?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const Dialog = ({
  children,
  hideButtons,
  isOpen,
  setIsOpen,
  onConfirm,
}: DialogProps) => {
  useHotkeys("esc", () => setIsOpen(false));

  return (
    <div
      className={`z-50 fixed inset-0 flex justify-center items-center bg-neutral-900/50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col items-center justify-center p-5 bg-neutral-800 rounded-md font-light text-neutral-50 dark:text-white">
        <div>{children}</div>
        {!hideButtons && (
          <div className="flex w-full justify-end items-center mt-5">
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
  );
};
export default Dialog;
