import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import Button from "src/components/Button";

interface DialogProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  disableAction?: boolean;
  className?: string;
  children?: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm?: () => void;
}

const DialogComponent = ({
  title,
  description,
  isOpen,
  children,
  disableAction,
  className,
  setIsOpen,
  onConfirm,
}: DialogProps) => {
  const closeDialog = () => setIsOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
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
              <Dialog.Panel
                className={clsx(
                  "w-auto max-w-md transform overflow-hidden rounded-2xl bg-neutral-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800",
                  className
                )}
              >
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-800 dark:text-gray-100"
                  >
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  </div>
                )}

                {children}

                {!disableAction && (
                  <div className="mt-8 flex justify-center gap-4">
                    <Button variant="ghost" onClick={closeDialog}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                      Yes
                    </Button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default DialogComponent;
