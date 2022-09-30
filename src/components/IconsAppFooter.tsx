import { useContext, useState } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import Dialog from "src/components/Dialog";
import ExportButton from "src/components/ExportButton";
import Tooltip from "src/components/Tooltip";
import { IconsContext } from "src/context/IconsContext";
import { convertToSVG } from "src/utils/convertToSVG";
import { downloadSVGs } from "src/utils/downloadSVGs";
import Icon from "./Icon";

const IconsAppFooter = ({ noIcons }) => {
  const [dialog, setDialog] = useState(null);
  const { icons, setIcons } = useContext(IconsContext);

  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const selectedAll = selectionCount === icons.length;

  const removeAll = () => {
    setIcons([]);
    setDialog(null);
  };

  const handleRemoveAll = () => {
    setDialog({
      title: "Remove All",
      description: "Are you sure you want to remove all icons?",
      onConfirm: removeAll,
    });
  };

  const removeSelected = () => {
    const newIcons = icons.filter((icon) => !selectedIcons.includes(icon));

    setIcons(newIcons);
    setDialog(null);
  };

  const handleRemoveSelected = () => {
    setDialog({
      title: "Remove Selected",
      description: "Are you sure you want to remove the selected icons?",
      onConfirm: removeSelected,
    });
  };

  const downloadAll = () => {
    const _icons = icons.map((icon) => ({
      name: icon.properties.name,
      svg: convertToSVG(icon),
    }));

    downloadSVGs(_icons, "app");
  };

  const downloadSelected = () => {
    const _icons = selectedIcons.map((icon) => ({
      name: icon.properties.name,
      svg: convertToSVG(icon),
    }));

    downloadSVGs(_icons, `app-selected`);
  };

  return (
    <>
      <div className="flex h-20 flex-col items-center justify-between gap-3 divide-neutral-300 p-4 dark:divide-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">{`${icons.length} icons`}</div>
        {!noIcons && (
          <div className="flex flex-col items-center divide-x divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row">
            {selectionCount > 0 && !selectedAll && (
              <div className="flex items-center gap-x-2 pr-3 text-sky-500">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-xs text-sky-500  dark:bg-neutral-900">
                  {selectionCount}
                </span>
                <Tooltip message="Remove Selected">
                  <Button
                    variant={ButtonVariants.Icon}
                    onClick={handleRemoveSelected}
                  >
                    <Icon icon="trash" size={20} />
                  </Button>
                </Tooltip>
                <Tooltip message="Download Selected SVGs">
                  <Button
                    variant={ButtonVariants.Icon}
                    onClick={downloadSelected}
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

            <div className="flex items-center gap-x-2 pl-3 text-neutral-600 dark:text-neutral-300">
              <Icon
                icon="window"
                size={16}
                className="text-neutral-400 dark:text-neutral-500"
              />
              <Tooltip message="Remove All">
                <Button variant={ButtonVariants.Icon} onClick={handleRemoveAll}>
                  <Icon icon="trash" size={20} />
                </Button>
              </Tooltip>
              <Tooltip message="Download All">
                <Button variant={ButtonVariants.Icon} onClick={downloadAll}>
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
        )}
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

export default IconsAppFooter;
