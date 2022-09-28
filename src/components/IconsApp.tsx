import { useContext, useState } from "react";
import clsx from "clsx";

import IconBox from "src/components/IconBox";
import NewIconBox from "src/components/NewIconBox";
import IconsAppHeader from "src/components/IconsAppHeader";
import ImportDropWrapper from "src/components/ImportDropWrapper";
import IconsAppFooter from "src/components/IconsAppFooter";
import { IconsContext } from "src/context/IconsContext";
import { DragDropContext } from "src/context/DragDropContext";

const IconsApp = () => {
  const { icons } = useContext(IconsContext);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");

  let filteredIcons = icons.filter((icon) =>
    icon.properties?.name.toLowerCase().includes(search.toLowerCase())
  );

  const noIcons = filteredIcons.length === 0;

  return (
    <div
      className={clsx(
        "flex h-[calc(100vh-9rem)] flex-col divide-y rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
        "divide-neutral-200 border-neutral-200 bg-neutral-100"
      )}
    >
      <IconsAppHeader noIcons={noIcons} search={search} setSearch={setSearch} />
      <ImportDropWrapper className="h-full overflow-y-auto overflow-x-hidden">
        <div
          className={clsx(
            "relative grid snap-y grid-cols-4 gap-2 py-8 px-0 transition sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12"
          )}
        >
          {search && noIcons && !isDragging && (
            <p className="w-screen p-4 text-center text-sm text-neutral-500">
              No icons found.
            </p>
          )}
          {!isDragging &&
            filteredIcons.map((icon) => (
              <IconBox key={icon.__meta?.id} icon={icon} />
            ))}
          {!search && !isDragging && <NewIconBox />}
          {isDragging && (
            <span
              className={clsx(
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
