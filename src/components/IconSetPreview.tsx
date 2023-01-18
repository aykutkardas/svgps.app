import { Fragment, useContext, useState } from "react";
import clsx from "clsx";

import IconSetPreviewHeader from "src/components/IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import IconSetPreviewContextMenu from "src/components/IconSetPreviewContextMenu";
import IconSetPreviewInspect from "src/components/IconSetPreviewInspect";
import ImportDropWrapper from "src/components/ImportDropWrapper";
import NewIconBox from "src/components/NewIconBox";
import { DragDropContext } from "src/context/DragDropContext";
import { IconsContext } from "src/context/IconsContext";
import { copyName } from "src/utils/iconActions";
import { convertToIconSet } from "src/utils/convertToIconSet";
import useDebounce from "src/hooks/useDebounce";
import { IconSet, IconSetItem } from "src/types";
import { Variant } from "src/icons";

interface IconSetPreviewProps {
  iconSet?: IconSet;
  variant?: Variant;
  data?: any;
  isApp?: boolean;
}

const IconSetPreview = ({
  iconSet,
  variant,
  data,
  isApp = false,
}: IconSetPreviewProps) => {
  const [contextMenu, setContextMenu] = useState<Record<string, any>>(null);
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);

  // icons
  let [icons, setIcons] = useState(iconSet?.icons || []);
  const [filteredIcons, setFilteredIcons] = useState(icons);

  if (isApp) {
    ({ icons, setIcons } = useContext(IconsContext));
  }
  // -

  const currentIconSet = isApp ? convertToIconSet(icons) : iconSet;

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

  const Wrapper = isApp ? ImportDropWrapper : Fragment;

  return (
    <>
      <div
        onClick={() => setContextMenu(null)}
        className={clsx(
          "relative flex h-[calc(100vh-6rem)] flex-col divide-y overflow-hidden rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
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
          isApp={isApp}
        />
        <div
          className={clsx(
            "flex-1 flex-wrap overflow-x-hidden",
            contextMenu ? "overflow-y-hidden pr-1" : "overflow-y-auto"
          )}
        >
          <Wrapper
            key={filteredIcons.length}
            className="h-full overflow-y-auto overflow-x-hidden"
          >
            <div
              className={clsx(
                "relative gap-1 py-6 px-3 pb-20 transition",
                { "h-full": isDragging },
                noIcons
                  ? "flex h-full flex-wrap items-center justify-center"
                  : "grid grid-cols-4 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-15 2xl:grid-cols-16"
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
                  key={isApp ? icon.__meta?.id : icon.properties.name}
                  icon={icon}
                  isApp={isApp}
                />
              ))}
              {isApp && !search && !isDragging && <NewIconBox />}
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
          </Wrapper>
        </div>
        <IconSetPreviewInspect
          isOpen={!!inspectedIcon}
          setIsOpen={setInspectedIcon}
          iconSet={currentIconSet}
          inspectedIcon={inspectedIcon}
          inspect={setInspectedIcon}
          isApp={isApp}
        />
        {icons.length > 0 && (
          <IconSetPreviewFooter
            iconSetData={data}
            icons={icons}
            setIcons={setIcons}
            isApp={isApp}
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

export default IconSetPreview;
