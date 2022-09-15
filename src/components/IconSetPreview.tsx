import { useContext, useState } from "react";
import cx from "clsx";

import { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";
import IconPreview from "src/components/IconPreview";
import ExportButton from "src/components/ExportButton";
import { DragDropContext } from "src/context/DragDropContext";

const IconSetPreview = ({ iconSet, data }) => {
  const [icons, setIcons] = useState(iconSet.icons);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;

  const handleSearch = ({ target }) => setSearch(target.value);

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
        <div className="flex-col text-right">
          <h4 className="darktext-neutral-300 text-sm text-neutral-800 dark:text-neutral-300">
            <span className="mr-1 rounded-md bg-neutral-200 p-1 text-[10px] text-neutral-400 dark:bg-neutral-600/30 dark:text-neutral-400">
              {data.licence}
            </span>
            {data.name}
          </h4>
          <span className="mt-0 text-xs text-neutral-700 dark:text-neutral-500">
            {data.creator}
          </span>
        </div>
      </div>
      <div
        className={cx(
          "relative grid snap-y grid-cols-4 gap-1 overflow-y-auto overflow-x-hidden py-8 px-0 transition sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-14",
          noIcons ? "h-52" : "max-h-[450px]"
        )}
      >
        {search && noIcons && !isDragging && (
          <p className="w-48 p-4 text-sm text-neutral-500">No icons found.</p>
        )}
        {filteredIcons.map((icon) => (
          <IconPreview
            icons={icons}
            setIcons={setIcons}
            key={icon.properties.name}
            icon={icon}
            disableRemove
          />
        ))}
      </div>

      <div className="min-h-20 flex flex-col items-center justify-between gap-3 divide-neutral-300 p-4 dark:divide-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">{`${icons.length} icons`}</div>
        <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
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
      </div>
    </div>
  );
};

export default IconSetPreview;
