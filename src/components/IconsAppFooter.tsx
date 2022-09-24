import { useContext, useState } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import Dialog from "src/components/Dialog";
import ExportButton from "src/components/ExportButton";
import { IconsContext } from "src/context/IconsContext";

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
  return (
    <>
      <div className="min-h-20 flex flex-col items-center justify-between gap-3 divide-neutral-300 p-4 dark:divide-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">{`${icons.length} icons`}</div>
        {!noIcons && (
          <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
            {selectionCount > 0 && !selectedAll && (
              <Button
                variant={ButtonVariants.Ghost}
                onClick={handleRemoveSelected}
                className="order-1 px-1"
              >
                Remove Selected
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-xs dark:bg-neutral-900">
                  {selectionCount}
                </span>
              </Button>
            )}
            <Button
              variant={ButtonVariants.Ghost}
              onClick={handleRemoveAll}
              className="order-3 w-full px-1 sm:order-1 sm:w-auto"
            >
              Remove All
            </Button>
            {selectionCount > 0 && !selectedAll && (
              <ExportButton
                variant={ButtonVariants.Secondary}
                icons={selectedIcons}
                className="order-2"
              >
                Export Selected
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-700 text-xs">
                  {selectionCount}
                </span>
              </ExportButton>
            )}
            <ExportButton
              className="order-1 sm:order-3"
              variant={ButtonVariants.Success}
              icons={icons}
            >
              Export All
            </ExportButton>
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
