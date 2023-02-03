import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import IconSetPreviewHeader from "src/components/IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import IconSetPreviewContextMenu from "src/components/IconSetPreviewContextMenu";
import IconSetPreviewInspect from "src/components/IconSetPreviewInspect";
import ImportDropWrapper from "src/components/ImportDropWrapper";
import NewIconBox from "src/components/NewIconBox";
import { DragDropContext } from "src/context/DragDropContext";
import { copyName } from "src/utils/iconActions";
import { convertToIconSet } from "src/utils/convertToIconSet";
import useDebounce from "src/hooks/useDebounce";
import { IconSet, IconSetItem } from "src/types";
import { Variant } from "src/iconSets";

interface CollectionPreviewProps {
  iconSet?: IconSet;
  variant?: Variant;
  data?: any;
  isCollection?: boolean;
  noLocalSync?: boolean;
  loading?: boolean;
  onDelete?: Function;
  onRename?: (name: string, type?: string) => void;
  onUpdate?: (icons: IconSetItem[], type?: string) => void;
}

const CollectionPreview = ({
  iconSet,
  variant,
  data,
  loading = false,
  isCollection = false,
  onRename,
  onDelete,
  onUpdate,
}: CollectionPreviewProps) => {
  const [contextMenu, setContextMenu] = useState<Record<string, any>>(null);
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);

  const icons = iconSet?.icons || [];

  const [filteredIcons, setFilteredIcons] = useState(icons);

  useEffect(() => {
    setFilteredIcons(icons);
  }, [iconSet?.icons]);

  const currentIconSet = isCollection ? convertToIconSet(icons) : iconSet;

  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");

  useDebounce(
    () => {
      setFilteredIcons(
        icons.filter((icon) =>
          icon.properties?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    [icons, search],
    200
  );

  const noIcons = filteredIcons.length === 0;

  const handleCopyName = (icon) => copyName(icon);

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
          "relative flex flex-col divide-y overflow-hidden rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
          "h-[calc(100vh-6rem)] divide-neutral-200 border-neutral-200 bg-neutral-100"
        )}
      >
        <IconSetPreviewHeader
          data={data}
          variant={variant}
          noIcons={noIcons}
          search={search}
          setSearch={setSearch}
          icons={icons}
          onDelete={onDelete}
          onRename={onRename}
          setIcons={onUpdate}
          isCollection={isCollection}
        />
        <div
          className={clsx(
            "flex-1 flex-wrap overflow-x-hidden",
            contextMenu ? "overflow-y-hidden" : "overflow-y-auto"
          )}
        >
          <ImportDropWrapper
            className={clsx("h-full overflow-y-auto overflow-x-hidden", {
              "pointer-events-none opacity-60": loading,
            })}
            icons={icons}
            setIcons={onUpdate}
          >
            <div
              className={clsx(
                "relative  grid-cols-4 gap-1 px-3 pb-20 pt-6 transition sm:grid-cols-7 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16",
                { "h-full": isDragging },
                filteredIcons.length === 0
                  ? "flex items-center justify-center"
                  : "grid",
                noIcons && "flex h-full flex-wrap items-center justify-center "
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
                  setIcons={onUpdate}
                  copyIconName={handleCopyName}
                  inspectedIcon={inspectedIcon}
                  inspect={setInspectedIcon}
                  key={isCollection ? icon.__meta?.id : icon.properties.name}
                  icon={icon}
                  isCollection={isCollection}
                />
              ))}
              {isCollection && !search && !isDragging && <NewIconBox />}
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
        </div>
        <IconSetPreviewInspect
          isOpen={!!inspectedIcon}
          setIsOpen={setInspectedIcon}
          iconSet={currentIconSet}
          inspectedIcon={inspectedIcon}
          inspect={setInspectedIcon}
          isCollection={isCollection}
        />
        {icons.length > 0 && (
          <IconSetPreviewFooter
            iconSetData={data}
            icons={icons}
            setIcons={onUpdate}
            isCollection={isCollection}
          />
        )}
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

export default CollectionPreview;
