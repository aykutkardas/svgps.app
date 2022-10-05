import { useContext, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Button, { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";
import SelectSize from "src/components/SelectSize";
import { IconsContext } from "src/context/IconsContext";
import {
  copyAsJSX,
  copyAsSVG,
  copyName,
  downloadAsSVG,
  sendToApp,
} from "src/utils/iconActions";

const IconSetPreviewInspect = ({
  iconSet,
  inspectedIcon,
  inspect,
  isOpen,
  setIsOpen,
}) => {
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);
  const [size, setSize] = useState(32);
  const closeDialog = () => setIsOpen(null);

  const handleCopySVG = () => copyAsSVG(inspectedIcon, size);
  const handleCopyJSX = () => copyAsJSX(inspectedIcon, size);
  const handleDownloadSVG = () => downloadAsSVG(inspectedIcon, size);
  const handleCopyIconName = () => copyName(inspectedIcon);
  const handleSendToApp = () =>
    sendToApp([inspectedIcon], appIcons, setAppIcons);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-50"
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
              <Dialog.Panel className="w-auto max-w-md transform overflow-hidden rounded-2xl bg-neutral-100 p-8 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                <div className="min-h-20 flex w-full flex-col-reverse items-start justify-between divide-neutral-300 dark:divide-neutral-700 sm:flex-row sm:divide-x">
                  <div className="mt-4 flex w-full flex-col items-center justify-center sm:mt-0  sm:items-start sm:pr-8">
                    <Icon
                      icon="close"
                      size={16}
                      className="absolute top-0 right-0 m-3 cursor-pointer text-neutral-800 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
                      onClick={() => inspect(null)}
                    />
                    <SelectSize size={size} setSize={setSize} />
                    <Button
                      className="px-0"
                      variant={ButtonVariants.Ghost}
                      onClick={handleSendToApp}
                    >
                      <Icon className="mr-1" icon="window-plus" size={20} />{" "}
                      Send to App
                    </Button>
                    <Button
                      className="px-0"
                      variant={ButtonVariants.Ghost}
                      onClick={handleCopyJSX}
                    >
                      <Icon className="mr-1" icon="copy" size={20} /> Copy as
                      JSX
                    </Button>
                    <Button
                      className="px-0"
                      variant={ButtonVariants.Ghost}
                      onClick={handleCopySVG}
                    >
                      <Icon className="mr-1" icon="copy" size={20} /> Copy as
                      SVG
                    </Button>
                    <Button
                      className="px-0"
                      variant={ButtonVariants.Ghost}
                      onClick={handleDownloadSVG}
                    >
                      <Icon className="mr-1" icon="download" size={20} />{" "}
                      Download as SVG
                    </Button>
                  </div>
                  <div className="flex flex-col items-center justify-center text-sm text-neutral-700 dark:text-neutral-300 sm:justify-start sm:pl-8">
                    <div className="flex h-[180px] w-[180px] items-center justify-center rounded-md border border-dashed border-neutral-600 p-2 ">
                      <Icon
                        iconSet={iconSet}
                        icon={inspectedIcon?.properties.name}
                        className="text-neutral-800 dark:text-neutral-200"
                        size={size}
                      />
                    </div>
                    <span
                      className="mt-2 inline-flex cursor-pointer items-center"
                      onClick={handleCopyIconName}
                    >
                      {inspectedIcon?.properties.name}
                      <Icon
                        icon="copy"
                        size={14}
                        className="ml-1 cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default IconSetPreviewInspect;
