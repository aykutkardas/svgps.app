import { useContext, useState } from "react";

import Icon from "src/components/Icon";
import Button from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import Tooltip from "src/components/Tooltip";
import Dialog from "src/components/Dialog";
import { IconsContext } from "src/context/IconsContext";
import {
  downloadMultipleSVG,
  sendToApp,
  downloadAsReactComponents,
} from "src/utils/iconActions";
import { IconSetItem } from "src/types";
import SupportActions from "./SupportActions";
import { useAuthContext } from "src/context/AuthContext";
import { IconSetData } from "src/iconSets";

interface IconSetPreviewFooterProps {
  icons: IconSetItem[];
  setIcons?: (icons: IconSetItem[]) => void;
  selectCollection?: (icons: IconSetItem[]) => void;
  iconSetData?: Partial<IconSetData>;
  isCollection?: boolean;
}

const IconSetPreviewFooter = ({
  icons,
  setIcons,
  selectCollection,
  isCollection,
  iconSetData,
}: IconSetPreviewFooterProps) => {
  const [dialog, setDialog] = useState(null);
  const { auth } = useAuthContext();
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);
  const iconSetSlug = isCollection ? "app" : iconSetData.slug;

  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const selectedAll = selectionCount === icons.length;

  const handleAddToCollection = () => {
    window?.hardal?.trackEvent("SEN60WH6I");
    if (selectCollection) {
      selectCollection(icons);
    } else {
      sendToApp(icons, appIcons, setAppIcons);
    }
  };

  const handleAddToCollectionSelected = () => {
    window?.hardal?.trackEvent("SENEA1HQ3");
    if (selectCollection) {
      selectCollection(selectedIcons);
    } else {
      sendToApp(selectedIcons, appIcons, setAppIcons);
    }
  };

  const handleDownloadAllAsSVG = () => {
    window?.hardal?.trackEvent("DOWV8BNWD");
    if (!auth) return;
    downloadMultipleSVG(iconSetSlug, icons);
  };

  const handleDownloadSelectedAsReact = () => {
    window?.hardal?.trackEvent("DONPKXLPN");
    if (!auth) return;
    downloadAsReactComponents(iconSetSlug, selectedIcons, 32);
  };

  const handleDownloadAllAsReact = () => {
    window?.hardal?.trackEvent("DOWGFLSX5");
    if (!auth) return;
    downloadAsReactComponents(iconSetSlug, icons, 32);
  };

  const handleDownloadSelectedAsSVG = () => {
    window?.hardal?.trackEvent("DOW89H8KV");
    if (!auth) return;
    downloadMultipleSVG(`${iconSetSlug}-selected`, selectedIcons);
  };

  const removeAll = () => {
    setIcons([]);
    setDialog(null);
  };

  const removeSelected = () => {
    const newIcons = icons.filter((icon) => !selectedIcons.includes(icon));

    setIcons(newIcons);
    setDialog(null);
  };

  const handleRemoveAll = () => {
    setDialog({
      title: "Remove All",
      description: "Are you sure you want to remove all icons?",
      onConfirm: removeAll,
    });
  };

  const handleRemoveSelected = () => {
    setDialog({
      title: "Remove Selected",
      description: "Are you sure you want to remove the selected icons?",
      onConfirm: removeSelected,
    });
  };

  return (
    <>
      <div className="min-h-20 z-10 flex flex-col items-center justify-between gap-3 divide-neutral-300 bg-neutral-100 p-4 dark:bg-neutral-800 sm:flex-row">
        <div className="flex-1 text-xs text-neutral-500">
          {`${icons.length} ${icons.length > 1 ? "icons" : "icon"}`}
        </div>
        <SupportActions />
        <div className="flex flex-1 flex-col items-center justify-end space-y-2 divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row sm:space-y-0 sm:divide-x">
          {selectionCount > 0 && !selectedAll && (
            <div className="flex items-center gap-x-2 text-purple-500 sm:pr-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-300 p-4 text-[11px] text-purple-500  dark:bg-neutral-900">
                {selectionCount > 99 ? "99+" : selectionCount}
              </span>
              {isCollection && (
                <Tooltip message="Remove Selected">
                  <Button variant="icon" onClick={handleRemoveSelected}>
                    <Icon icon="trash" size={20} />
                  </Button>
                </Tooltip>
              )}
              {!isCollection && (
                <Tooltip message="Add to Collection">
                  <Button
                    variant="icon"
                    onClick={handleAddToCollectionSelected}
                  >
                    <Icon icon="squares-plus" size={20} />
                  </Button>
                </Tooltip>
              )}
              <Tooltip
                message={
                  "Download as React Components" + (!auth ? " (User Only)" : "")
                }
              >
                <Button
                  disabled={!auth}
                  variant="icon"
                  onClick={handleDownloadSelectedAsReact}
                >
                  <Icon icon="filetype-jsx" size={20} />
                  <Icon icon="download" size={20} />
                </Button>
              </Tooltip>
              <Tooltip
                message={
                  "Download Selected SVGs" + (!auth ? " (User Only)" : "")
                }
              >
                <Button
                  disabled={!auth}
                  variant="icon"
                  onClick={handleDownloadSelectedAsSVG}
                >
                  <Icon icon="filetype-svg" size={20} />
                  <Icon icon="download" size={20} />
                </Button>
              </Tooltip>
              <Tooltip message="Convert Selected to JSON">
                <ExportButton variant="icon" icons={selectedIcons}>
                  <Icon icon="filetype-json" size={20} />
                  <Icon icon="download" size={20} />
                </ExportButton>
              </Tooltip>
            </div>
          )}

          <div className="flex items-center gap-x-2 text-neutral-600 dark:text-neutral-300 sm:pl-3">
            <span className="inline-flex h-5 w-5 items-center">
              <Icon
                icon="package"
                size={16}
                className="text-neutral-400 dark:text-neutral-500"
              />
            </span>
            {isCollection && (
              <Tooltip message="Remove All">
                <Button variant="icon" onClick={handleRemoveAll}>
                  <Icon icon="trash" size={20} />
                </Button>
              </Tooltip>
            )}
            {!isCollection && (
              <Tooltip message="Add to Collection">
                <Button variant="icon" onClick={handleAddToCollection}>
                  <Icon icon="squares-plus" size={20} />
                </Button>
              </Tooltip>
            )}
            <Tooltip
              message={
                "Download All as React Component" +
                (!auth ? " (User Only)" : "")
              }
            >
              <Button
                disabled={!auth}
                variant="icon"
                onClick={handleDownloadAllAsReact}
              >
                <Icon icon="filetype-jsx" size={20} />
                <Icon icon="download" size={20} />
              </Button>
            </Tooltip>
            <Tooltip message={"Download All" + (!auth ? " (User Only)" : "")}>
              <Button
                disabled={!auth}
                variant="icon"
                onClick={handleDownloadAllAsSVG}
              >
                <Icon icon="filetype-svg" size={20} />
                <Icon icon="download" size={20} />
              </Button>
            </Tooltip>
            <Tooltip message="Convert All">
              <ExportButton variant="icon" icons={icons}>
                <Icon icon="filetype-json" size={20} />
                <Icon icon="download" size={20} />
              </ExportButton>
            </Tooltip>
          </div>
        </div>
      </div>
      <Dialog
        isOpen={!!dialog}
        setIsOpen={setDialog}
        onConfirm={dialog?.onConfirm}
        title={dialog?.title}
        description={dialog?.description}
      />
    </>
  );
};

export default IconSetPreviewFooter;
