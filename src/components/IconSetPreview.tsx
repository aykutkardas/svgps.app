import { useContext, useState } from "react";
import cx from "classnames";

import Button, { ButtonVariants } from "src/components/Button";
import Dialog from "src/components/Dialog";
import Icon from "src/components/Icon";
import IconBox from "src/components/IconBox";
import NewIconBox from "src/components/NewIconBox";
import ExportButton from "src/components/ExportButton";
import ImportButton from "src/components/ImportButton";
import { IconsContext } from "src/context/IconsContext";
import { DragDropContext } from "src/context/DragDropContext";

const IconSetPreview = () => {
  const { icons, setIcons } = useContext(IconsContext);
  const { isDragging, setIsDragging } = useContext(DragDropContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;

  const handleSearch = ({ target }) => setSearch(target.value);

  const clearAll = () => {
    setIcons([]);
    setIsDialogOpen(false);
  };

  let filteredIcons = icons.filter((icon) =>
    icon.properties?.name.toLowerCase().includes(search.toLowerCase())
  );

  const noIcons = filteredIcons.length === 0;

  return (
    <div
      className={cx(
        "flex flex-col divide-y rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
        "divide-neutral-200 border-neutral-200 bg-neutral-100"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <label
          className={cx(
            "inline-flex w-64 items-center bg-neutral-200 bg-transparent py-1 text-neutral-400",
            { "cursor-not-allowed opacity-40": noIcons && !search }
          )}
        >
          <Icon icon="search" size={16} className="text-current" />
          <input
            className="ml-2 h-6 w-full rounded-sm border-none bg-transparent text-sm text-current outline-none disabled:cursor-not-allowed"
            onKeyUp={handleSearch}
            placeholder="Search..."
            disabled={noIcons && !search}
          />
        </label>
        <ImportButton className="order-2 sm:order-1" />
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        onDragEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(false);
        }}
        className="relative grid max-h-[450px] snap-y grid-cols-3 gap-2 overflow-y-auto py-8 px-0 transition sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9"
      >
        {search && noIcons && (
          <p className="w-48 p-4 text-sm text-neutral-500">No icons found.</p>
        )}
        {isDragging && (
          <span
            className={cx(
              "absolute inset-0 z-10 flex items-center justify-center text-center text-neutral-500",
              "animate-drag-outline bg-neutral-50 outline-dashed outline-2 outline-neutral-300 dark:bg-neutral-800 dark:outline-neutral-300/40"
            )}
          >
            Drop your SVGs here
          </span>
        )}
        {filteredIcons.map((icon) => (
          <IconBox key={icon.__meta?.id} icon={icon} />
        ))}
        {!search && <NewIconBox />}
      </div>
      <Dialog
        onConfirm={clearAll}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Remove All"
        description="Are you sure you want to clear all icons?"
      />
      <div className="min-h-20 flex flex-col items-center justify-between gap-3 divide-neutral-300 p-4 dark:divide-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">{`${icons.length} icons`}</div>
        {!noIcons && (
          <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
            <Button
              variant={ButtonVariants.Ghost}
              onClick={() => setIsDialogOpen(true)}
              className="order-3 w-full sm:order-1 sm:w-auto "
            >
              Remove All
            </Button>
            {selectionCount > 0 && (
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
    </div>
  );
};

export default IconSetPreview;
