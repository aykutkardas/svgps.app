import { useContext, useState } from "react";

import Icon from "src/components/Icon";
import Button from "src/components/Button";
import Tooltip from "src/components/Tooltip";
import Dialog from "src/components/Dialog";
import {
  downloadMultipleSVG,
  sendToApp,
  downloadAsReactComponents,
} from "src/utils/iconActions";
import { IconSetItem } from "src/types";
import SupportActions from "./SupportActions";
import { IconSetData } from "src/iconSets";
import IconSetDownload from "./IconSetDownload";
import IconSetCopy from "./IconSetCopy";
import useGuestCollectionStore from "src/stores/guest-collection";

interface IconSetPreviewFooterProps {
  icons: IconSetItem[];
  setIcons: (icons: IconSetItem[]) => void;
  iconSetData?: Partial<IconSetData>;
  isCollection?: boolean;
}

interface Dialog {
  title: string;
  description: string;
  onConfirm: () => void;
}

const IconSetPreviewFooter = ({
  icons,
  setIcons,
  isCollection,
  iconSetData,
}: IconSetPreviewFooterProps) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { guestIcons, setGuestIcons } = useGuestCollectionStore();
  const iconSetSlug = isCollection ? "app" : iconSetData?.slug;

  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const selectedAll = selectionCount === icons.length;

  const handleAddToCollection = () => {
    sendToApp(icons, guestIcons, setGuestIcons);
  };

  const handleAddToCollectionSelected = () => {
    sendToApp(selectedIcons, guestIcons, setGuestIcons);
  };

  const handleDownloadAllAsSVG = () => {
    downloadMultipleSVG(iconSetSlug, icons);
  };

  const handleDownloadSelectedAsReact = () => {
    downloadAsReactComponents(iconSetSlug, selectedIcons, 32);
  };

  const handleDownloadAllAsReact = () => {
    downloadAsReactComponents(iconSetSlug, icons, 32);
  };

  const handleDownloadSelectedAsSVG = () => {
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
      <div className="z-10 flex flex-col items-center justify-between gap-3 bg-surface-raised/60 px-4 py-3 backdrop-blur-md sm:flex-row sm:px-5">
        <div className="flex flex-1 items-center gap-2 text-xs text-fg-subtle">
          <span className="font-medium text-fg-muted">{icons.length}</span>
          {icons.length > 1 ? "icons" : "icon"}
        </div>
        <SupportActions />
        <div className="flex flex-1 flex-col items-center justify-end gap-2 sm:order-2 sm:flex-row sm:gap-3">
          {selectionCount > 0 && !selectedAll && (
            <div className="flex items-center gap-1.5 rounded-xl border border-accent/40 bg-accent-soft py-1 pr-1 pl-3">
              <span className="mr-1 text-xs font-medium text-accent-fg">
                {selectionCount > 99 ? "99+" : selectionCount} selected
              </span>
              {isCollection && (
                <Tooltip message="Remove Selected">
                  <Button
                    variant="icon"
                    aria-label="Remove selected"
                    className="size-8 hover:border-rose-400/50 hover:text-rose-300"
                    onClick={handleRemoveSelected}
                  >
                    <Icon icon="trash" size={17} />
                  </Button>
                </Tooltip>
              )}
              {!isCollection && (
                <Tooltip message="Add to Collection">
                  <Button
                    variant="icon"
                    aria-label="Add selected to collection"
                    className="size-8"
                    onClick={handleAddToCollectionSelected}
                  >
                    <Icon icon="squares-plus" size={17} />
                  </Button>
                </Tooltip>
              )}

              <IconSetCopy onlySelected icons={selectedIcons} />
              <IconSetDownload
                onlySelected
                downloadAllJSX={handleDownloadSelectedAsReact}
                downloadAllSVG={handleDownloadSelectedAsSVG}
                icons={selectedIcons}
              />
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <span className="mr-1 text-xs text-fg-subtle">All</span>
            {isCollection && (
              <Tooltip message="Remove All">
                <Button
                  variant="icon"
                  aria-label="Remove all"
                  className="hover:border-rose-400/50 hover:text-rose-300"
                  onClick={handleRemoveAll}
                >
                  <Icon icon="trash" size={18} />
                </Button>
              </Tooltip>
            )}
            {!isCollection && (
              <Tooltip message="Add to Collection">
                <Button
                  variant="icon"
                  aria-label="Add all to collection"
                  onClick={handleAddToCollection}
                >
                  <Icon icon="squares-plus" size={18} />
                </Button>
              </Tooltip>
            )}
            <IconSetCopy onlySelected={false} icons={icons} />
            <IconSetDownload
              onlySelected={false}
              downloadAllJSX={handleDownloadAllAsReact}
              downloadAllSVG={handleDownloadAllAsSVG}
              icons={icons}
            />
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
