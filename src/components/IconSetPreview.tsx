import { useContext, useState } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

import IconSetPreviewHeader from "src/components/IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import { DragDropContext } from "src/context/DragDropContext";
import { IconSetItem } from "src/types";
import IconSetPreviewContextMenu from "src/components/IconSetPreviewContextMenu";

const IconSetPreview = ({ iconSet, variant, data }) => {
  const [contextMenu, setContextMenu] = useState<Record<string, any>>(null);
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);
  const [icons, setIcons] = useState(iconSet.icons);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");

  const filteredIcons = icons.filter((icon) =>
    icon.properties?.name.toLowerCase().includes(search.toLowerCase())
  );

  const noIcons = filteredIcons.length === 0;

  const handleCopyName = (icon) => {
    const iconName = icon.properties.name;
    copy(iconName);
    toast.success(`"${iconName}" copied!`);
  };

  const handleContextMenu = (event, icon) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({ x: event.pageX, y: event.pageY, icon });
  };

  return (
    <>
      <div
        onClick={() => setContextMenu(null)}
        className={clsx(
          "relative flex h-[calc(100vh-9rem)] flex-col divide-y overflow-hidden rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
          "divide-neutral-200 border-neutral-200 bg-neutral-100"
        )}
      >
        <IconSetPreviewHeader
          data={data}
          variant={variant}
          noIcons={noIcons}
          search={search}
          setSearch={setSearch}
          icons={icons}
          setIcons={setIcons}
        />
        <div
          className={clsx(
            "flex-1  overflow-x-hidden",
            contextMenu ? "overflow-y-hidden pr-1" : "overflow-y-auto"
          )}
        >
          <div
            className={clsx(
              "relative grid-cols-4 gap-1 py-8 px-0 pb-20 transition",
              noIcons
                ? "flex items-center justify-center"
                : "grid sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-15 2xl:grid-cols-16"
            )}
          >
            {search && noIcons && !isDragging && (
              <p className="w-48 p-4 text-sm text-neutral-500">
                No icons found.
              </p>
            )}
            {filteredIcons.map((icon) => (
              <IconPreview
                icons={icons}
                onContextMenu={handleContextMenu}
                setIcons={setIcons}
                copyIconName={handleCopyName}
                inspectedIcon={inspectedIcon}
                inspect={setInspectedIcon}
                key={icon.properties.name}
                icon={icon}
                disableRemove
              />
            ))}
          </div>
        </div>
        <IconSetPreviewFooter
          iconSetData={data}
          icons={icons}
          inspectedIcon={inspectedIcon}
          iconSet={iconSet}
          copyIconName={handleCopyName}
          inspect={setInspectedIcon}
        />
      </div>
      {contextMenu && (
        <IconSetPreviewContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          inspectedIcon={inspectedIcon}
          setInspectedIcon={setInspectedIcon}
        />
      )}
    </>
  );
};

export default IconSetPreview;
