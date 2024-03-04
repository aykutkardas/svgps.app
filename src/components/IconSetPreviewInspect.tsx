import { useContext, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { getIconSetLink } from "src/utils/getIconSetLink";

import clsx from "clsx";

import Button from "src/components/Button";
import Icon from "src/components/Icon";
import SelectSize from "src/components/SelectSize";
import {
  copyAsJSX,
  copyAsSVG,
  copyName,
  downloadAsSVG,
  sendToApp
} from "src/utils/iconActions";
import { IconSet, IconSetItem } from "src/types";
import useGuestCollectionStore from "src/stores/guest-collection";

const iconBgColors = [
  "bg-rose-400/80",
  "bg-emerald-400/80",
  "bg-sky-400/80",
  "bg-amber-400/80",
  "bg-neutral-200",
];

interface IconSetPreviewInspectProps {
  isCollection?: boolean;
 
  iconSet: IconSet;
  inspectedIcon: IconSetItem;
  isOpen: boolean;
  setIsOpen: (inspectedIcon: IconSetItem | null) => void;
  isSearch?: boolean;
}

const IconSetPreviewInspect = ({
  iconSet,
  inspectedIcon,
  isOpen,
  setIsOpen,
  isCollection,
  isSearch = true,
} : IconSetPreviewInspectProps) => {
  const { guestIcons, setGuestIcons } = useGuestCollectionStore();
  const [size, setSize] = useState(120);
  const closeDialog = () => setIsOpen(null);
  const router = useRouter();

  const handleCopySVG = () => copyAsSVG(inspectedIcon, size);
  const handleCopyJSX = () => copyAsJSX(inspectedIcon, size);
  const handleDownloadSVG = () => downloadAsSVG(inspectedIcon, size);
  const handleCopyIconName = () => copyName(inspectedIcon);
  const handleSendToApp = () =>
    sendToApp([inspectedIcon], guestIcons, setGuestIcons);
    const handleOpenIconSet = () => {
      router.push(
        "/store/" +
        getIconSetLink(inspectedIcon?.properties.iconSetName as string)
      );
    };
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
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100 delay-300"
              enterFrom="opacity-0 scale-95 delay-300"
              enterTo="opacity-100 scale-100 delay-300"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[500px] max-w-[90%] transform overflow-hidden rounded-2xl bg-neutral-100 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                <div className="flex h-auto w-full flex-col-reverse items-start justify-between sm:flex-row">
                  <div className="mt-4 flex w-full flex-col items-center justify-center p-6 sm:mt-0 sm:items-start  md:min-h-[300px] md:w-[400px]">
                    <Icon
                      icon="close"
                      size={16}
                      className="absolute top-0 right-0 m-4 cursor-pointer hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300"
                      onClick={() => setIsOpen(null)}
                    />
                    <SelectSize size={size} setSize={setSize} />
                    {!isCollection && (
                      <Button
                        className="px-0"
                        variant="ringlessGhost"
                        onClick={handleSendToApp}
                      >
                        <Icon className="mr-1" icon="squares-plus" size={20} />{" "}
                        Add to Collection
                      </Button>
                    )}
                    <Button
                      className="px-0"
                      variant="ringlessGhost"
                      onClick={handleCopyJSX}
                    >
                      <Icon className="mr-1" icon="copy" size={20} /> Copy as
                      JSX
                    </Button>
                    <Button
                      className="px-0"
                      variant="ringlessGhost"
                      onClick={handleCopySVG}
                    >
                      <Icon className="mr-1" icon="copy" size={20} /> Copy as
                      SVG
                    </Button>
                    <Button
                      className="px-0"
                      variant="ringlessGhost"
                      onClick={handleDownloadSVG}
                    >
                      <Icon className="mr-1" icon="download" size={20} />{" "}
                      Download as SVG
                    </Button>
                    {(isSearch || isCollection) && (
                      <Button
                        className="px-0"
                        variant="ringlessGhost"
                        onClick={handleOpenIconSet}
                      >
                        <Icon
                          icon="arrow-up-right"
                          className="mr-1"
                          size={20}
                        />
                        Go to icon set
                      </Button>
                    )}
                  </div>
                  <div className="items-between flex h-full min-h-[300px] w-full flex-col justify-between bg-neutral-900 px-0 pt-8 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <div className="flex h-[120px] w-[120px] items-center justify-center">
                        <Icon
                          iconSet={iconSet}
                          icon={inspectedIcon?.properties.name}
                          className="text-neutral-800 dark:text-neutral-200"
                          size={size}
                        />
                      </div>
                      <span
                        className="mt-4 inline-flex cursor-pointer items-center text-xs text-neutral-400 hover:text-neutral-300"
                        onClick={handleCopyIconName}
                      >
                        <p className="max-w-[160px] truncate">
                          {inspectedIcon?.properties.name}
                        </p>
                        <Icon
                          icon="copy"
                          size={14}
                          className="ml-1 cursor-pointer"
                        />
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-center">
                      {iconBgColors.map((color) => (
                        <div
                          key={color}
                          className={clsx(
                            "flex h-12 w-12 min-w-[20%] items-center justify-center p-2",
                            color,
                          )}
                        >
                          <Icon
                            iconSet={iconSet}
                            icon={inspectedIcon?.properties.name}
                            className={clsx(
                              color === "bg-neutral-200"
                                ? "text-neutral-800"
                                : "text-white",
                            )}
                            size={24}
                          />
                        </div>
                      ))}
                    </div>
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
