import { useContext, useState } from "react";
import cx from "clsx";

import Icon from "src/components/Icon";
import IconBox from "src/components/IconBox";
import NewIconBox from "src/components/NewIconBox";
import ImportButton from "src/components/ImportButton";
import ImportDropWrapper from "src/components/ImportDropWrapper";
import IconsAppFooter from "./IconsAppFooter";
import { IconsContext } from "src/context/IconsContext";
import { DragDropContext } from "src/context/DragDropContext";

const IconsApp = () => {
  const { icons } = useContext(IconsContext);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");

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
        <ImportButton className="order-2 sm:order-1" />
      </div>
      <ImportDropWrapper>
        <div
          className={cx(
            "relative grid snap-y grid-cols-3 gap-2 overflow-y-auto overflow-x-hidden py-8 px-0 transition sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9",
            isDragging || noIcons ? "h-52" : "max-h-[450px]"
          )}
        >
          {search && noIcons && !isDragging && (
            <p className="w-48 p-4 text-sm text-neutral-500">No icons found.</p>
          )}
          {!isDragging &&
            filteredIcons.map((icon) => (
              <IconBox key={icon.__meta?.id} icon={icon} />
            ))}
          {!search && !isDragging && <NewIconBox />}
          {isDragging && (
            <span
              className={cx(
                "pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-neutral-500",
                "drag-outline bg-neutral-100 dark:bg-neutral-800"
              )}
            >
              Drop your SVGs here
            </span>
          )}
        </div>
      </ImportDropWrapper>
      <IconsAppFooter noIcons={noIcons} />
    </div>
  );
};

export default IconsApp;
