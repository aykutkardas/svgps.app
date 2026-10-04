import { Fragment } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import Button from "src/components/Button";

interface DialogProps {
  title?: string;
  description?: string;
  confirmText?: string;
  isOpen: boolean;
  disableAction?: boolean;
  className?: string;
  children?: React.ReactNode;
  setIsOpen: (isOpen: null) => void;
  onConfirm?: () => void;
}

const Dialog = ({
  title,
  description,
  isOpen,
  children,
  disableAction,
  className,
  setIsOpen,
  onConfirm,
  confirmText = "Yes",
}: DialogProps) => {
  const closeDialog = () => setIsOpen(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={clsx(
                  "w-full max-w-sm transform overflow-hidden rounded-2xl border border-line-strong bg-surface-raised p-6 text-left align-middle shadow-elevated transition-all",
                  className,
                )}
              >
                {title && (
                  <HeadlessDialog.Title
                    as="h3"
                    className="text-base leading-6 font-semibold text-fg"
                  >
                    {title}
                  </HeadlessDialog.Title>
                )}
                {description && (
                  <div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {description}
                    </p>
                  </div>
                )}

                {children}

                {!disableAction && (
                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="secondary" onClick={closeDialog}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      className="from-rose-500! to-rose-600! shadow-none hover:from-rose-400!"
                      onClick={onConfirm}
                    >
                      {confirmText}
                    </Button>
                  </div>
                )}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
export default Dialog;
