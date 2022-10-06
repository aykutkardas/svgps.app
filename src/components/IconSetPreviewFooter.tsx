import { useContext, useState } from "react";

import Icon from "src/components/Icon";
import Button, { ButtonVariants } from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import Tooltip from "src/components/Tooltip";
import Dialog from "src/components/Dialog";
import { IconsContext } from "src/context/IconsContext";
import { downloadMultipleSVG, sendToApp } from "src/utils/iconActions";
import { IconSetItem } from "src/types";

interface IconSetPreviewFooterProps {
  icons: IconSetItem[];
  setIcons?: Function;
  iconSetData?: any;
  isApp?: boolean;
}

const IconSetPreviewFooter = ({
  icons,
  setIcons,
  isApp,
  iconSetData,
}: IconSetPreviewFooterProps) => {
  const [dialog, setDialog] = useState(null);
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);
  const iconSetSlug = isApp ? "app" : iconSetData.slug;

  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const selectedAll = selectionCount === icons.length;

  const handleSendToAppAll = () => sendToApp(icons, appIcons, setAppIcons);

  const handleSendToAppSelected = () =>
    sendToApp(selectedIcons, appIcons, setAppIcons);

  const handleDownloadAllAsSVG = () => downloadMultipleSVG(iconSetSlug, icons);

  const handleDownloadSelectedAsSVG = () =>
    downloadMultipleSVG(`${iconSetSlug}-selected`, selectedIcons);

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
        <div className="text-xs text-neutral-500">
          {`${icons.length} icons`}
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row sm:space-y-0 sm:divide-x">
          {selectionCount > 0 && !selectedAll && (
            <div className="flex items-center gap-x-2 text-sky-500 sm:pr-3">
              <span className="min-w-5 inline-flex h-5 items-center justify-center rounded-full bg-neutral-300 p-1 text-xs text-sky-500  dark:bg-neutral-900">
                {selectionCount}
              </span>
              {isApp && (
                <Tooltip message="Remove Selected">
                  <Button
                    variant={ButtonVariants.Icon}
                    onClick={handleRemoveSelected}
                  >
                    <Icon icon="trash" size={20} />
                  </Button>
                </Tooltip>
              )}
              {!isApp && (
                <Tooltip message="Send to App">
                  <Button
                    variant={ButtonVariants.Icon}
                    className="text-orange-400 hover:text-orange-300"
                    onClick={handleSendToAppSelected}
                  >
                    <Icon icon="window-plus" size={20} />
                  </Button>
                </Tooltip>
              )}
              <Tooltip message="Download Selected SVGs">
                <Button
                  variant={ButtonVariants.Icon}
                  onClick={handleDownloadSelectedAsSVG}
                >
                  <Icon icon="filetype-svg" size={20} />
                  <Icon icon="download" size={20} />
                </Button>
              </Tooltip>
              <Tooltip message="Convert Selected to JSON">
                <ExportButton
                  variant={ButtonVariants.Icon}
                  icons={selectedIcons}
                >
                  <Icon icon="filetype-json" size={20} />
                  <Icon icon="download" size={20} />
                </ExportButton>
              </Tooltip>
            </div>
          )}

          <div className="flex items-center gap-x-2 text-neutral-600 dark:text-neutral-300 sm:pl-3">
            <span className="h-5 w-5">
              <Icon
                icon="package"
                size={16}
                className="text-neutral-400 dark:text-neutral-500"
              />
            </span>
            {isApp && (
              <Tooltip message="Remove All">
                <Button variant={ButtonVariants.Icon} onClick={handleRemoveAll}>
                  <Icon icon="trash" size={20} />
                </Button>
              </Tooltip>
            )}
            {!isApp && (
              <Tooltip message="Send to App">
                <Button
                  variant={ButtonVariants.Icon}
                  className="text-orange-400 hover:text-orange-300"
                  onClick={handleSendToAppAll}
                >
                  <Icon icon="window-plus" size={20} />
                </Button>
              </Tooltip>
            )}
            <Tooltip message="Download All">
              <Button
                variant={ButtonVariants.Icon}
                onClick={handleDownloadAllAsSVG}
              >
                <Icon icon="filetype-svg" size={20} />
                <Icon icon="download" size={20} />
              </Button>
            </Tooltip>
            <Tooltip message="Convert All">
              <ExportButton variant={ButtonVariants.Icon} icons={icons}>
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
