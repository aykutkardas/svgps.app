import { useContext, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { getIconSetLink } from "src/utils/getIconSetLink";

import clsx from "clsx";

import Icon from "src/components/Icon";
import SelectSize from "src/components/SelectSize";
import {
  copyAsJSX,
  copyAsSVG,
  copyName,
  downloadAsSVG,
  sendToApp,
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
  iconSet: IconSet;
  inspectedIcon: IconSetItem;
  isOpen: boolean;
  setIsOpen: (inspectedIcon: IconSetItem | null) => void;
  isCollection?: boolean;
  isSearch?: boolean;
}

const IconSetPreviewInspect = ({
  iconSet,
  inspectedIcon,
  isOpen,
  setIsOpen,
  isCollection,
  isSearch,
}: IconSetPreviewInspectProps) => {
  const { guestIcons, setGuestIcons } = useGuestCollectionStore();
  const [size, setSize] = useState(120);
  const closeDialog = () => setIsOpen(null);
  const router = useRouter();
  const iconSetName = inspectedIcon?.properties.iconSetName;
  const handleCopySVG = () => copyAsSVG(inspectedIcon, size);

  const handleCopyJSX = () => copyAsJSX(inspectedIcon, size);
  const handleDownloadSVG = () => downloadAsSVG(inspectedIcon, size);
  const handleCopyIconName = () => copyName(inspectedIcon);
  const handleSendToApp = () =>
    sendToApp([inspectedIcon], guestIcons, setGuestIcons);
  const handleOpenIconSet = () => {
    router.push(
      "/store/" +
        getIconSetLink(inspectedIcon?.properties.iconSetName as string),
    );
  };
  const actionClassName =
    "flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-fg-muted transition hover:bg-white/[0.06] hover:text-fg";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-[560px] transform overflow-hidden rounded-2xl border border-line-strong bg-surface-raised text-left shadow-elevated transition-all">
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsOpen(null)}
                  className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-lg text-fg-subtle transition hover:bg-white/[0.08] hover:text-fg"
                >
                  <Icon icon="close" size={14} />
                </button>
                <div className="flex flex-col-reverse sm:flex-row">
                  <div className="flex w-full flex-col gap-1 p-4 sm:w-[220px] sm:shrink-0 sm:border-r sm:border-line sm:p-5">
                    <Dialog.Title className="mb-3 hidden px-3 text-xs font-medium tracking-wide text-fg-subtle uppercase sm:block">
                      Actions
                    </Dialog.Title>
                    <SelectSize size={size} setSize={setSize} />
                    {!isCollection && (
                      <button
                        className={actionClassName}
                        onClick={handleSendToApp}
                      >
                        <Icon icon="squares-plus" size={18} />
                        Add to Collection
                      </button>
                    )}
                    <button className={actionClassName} onClick={handleCopyJSX}>
                      <Icon icon="filetype-jsx" size={18} />
                      Copy as JSX
                    </button>
                    <button className={actionClassName} onClick={handleCopySVG}>
                      <Icon icon="filetype-svg" size={18} />
                      Copy as SVG
                    </button>
                    <button
                      className={actionClassName}
                      onClick={handleDownloadSVG}
                    >
                      <Icon icon="download" size={18} />
                      Download as SVG
                    </button>
                    {(isCollection || isSearch) && iconSetName && (
                      <button
                        className={actionClassName}
                        onClick={handleOpenIconSet}
                      >
                        <Icon icon="arrow-up-right" size={18} />
                        Go to icon set
                      </button>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-1 flex-col items-center justify-center bg-[radial-gradient(circle,rgb(255_255_255/0.07)_1px,transparent_1px)] [background-size:16px_16px] px-6 pt-12 pb-6">
                      <div className="flex size-[140px] items-center justify-center">
                        <Icon
                          iconSet={iconSet}
                          icon={inspectedIcon?.properties.name}
                          className="text-fg"
                          size={Math.min(size, 120)}
                        />
                      </div>
                      <button
                        type="button"
                        className="mt-5 inline-flex max-w-full items-center gap-1.5 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs text-fg-muted transition hover:border-line-strong hover:text-fg"
                        onClick={handleCopyIconName}
                        title="Copy name"
                      >
                        <span className="max-w-[180px] truncate font-fira">
                          {inspectedIcon?.properties.name}
                        </span>
                        <Icon icon="copy" size={12} className="shrink-0" />
                      </button>
                    </div>
                    <div className="grid grid-cols-5 border-t border-line">
                      {iconBgColors.map((color) => (
                        <div
                          key={color}
                          className={clsx(
                            "flex h-12 items-center justify-center",
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
                            size={22}
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
