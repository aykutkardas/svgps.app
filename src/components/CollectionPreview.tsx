import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import IconSetPreviewHeader from "src/components/IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import IconSetPreviewContextMenu from "src/components/IconSetPreviewContextMenu";
import IconSetPreviewInspect from "src/components/IconSetPreviewInspect";
import ImportDropWrapper from "src/components/ImportDropWrapper";
import NewIconBox from "src/components/NewIconBox";
import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";
import { buttonClassName } from "src/components/Button";
import Link from "next/link";
import { DragDropContext } from "src/context/DragDropContext";
import { copyName } from "src/utils/iconActions";
import { convertToIconSet } from "src/utils/convertToIconSet";
import useDebounce from "src/hooks/useDebounce";
import { IconSet, IconSetItem } from "src/types";
import { Variant } from "src/iconSets";

interface CollectionPreviewProps {
  iconSet?: IconSet;
  variant?: Variant;
  noLocalSync?: boolean;
  loading?: boolean;
  onUpdate?: (icons: IconSetItem[], type?: string) => void;
}

const CollectionPreview = ({
  iconSet,
  variant,
  loading = false,
  onUpdate,
}: CollectionPreviewProps) => {
  const [contextMenu, setContextMenu] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem | null>(null);

  const icons = iconSet?.icons || [];

  const [filteredIcons, setFilteredIcons] = useState(icons);

  useEffect(() => {
    setFilteredIcons(icons);
  }, [iconSet?.icons]);

  const currentIconSet = convertToIconSet(icons);

  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");

  useDebounce(
    () => {
      setFilteredIcons(
        icons.filter((icon) =>
          icon.properties?.name.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    },
    [icons, search],
    200,
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
        className="panel h-full divide-y divide-line"
      >
        <IconSetPreviewHeader
          variant={variant}
          noIcons={noIcons}
          search={search}
          setSearch={setSearch}
          icons={icons}
          setIcons={onUpdate}
          isCollection={true}
        />
        <div
          className={clsx(
            "flex-1 flex-wrap overflow-x-hidden",
            contextMenu ? "overflow-y-hidden" : "overflow-y-auto",
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
                "relative gap-2 p-4 transition sm:p-5",
                { "h-full": isDragging },
                noIcons
                  ? "flex h-full flex-wrap items-center justify-center"
                  : "grid grid-cols-[repeat(auto-fill,minmax(76px,1fr))] content-start sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]",
              )}
            >
              {search && noIcons && !isDragging && (
                <div className="flex flex-col items-center gap-2 p-6 text-center">
                  <Icon icon="search" size={22} className="text-fg-subtle" />
                  <p className="text-sm text-fg-muted">No icons found.</p>
                </div>
              )}
              {!search && noIcons && !isDragging && onUpdate && (
                <div className="flex max-w-sm animate-fade-in flex-col items-center p-6 text-center">
                  <span className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-line-strong bg-accent-soft text-accent-fg shadow-glow">
                    <Icon icon="package" size={26} />
                  </span>
                  <h2 className="text-base font-semibold text-fg">
                    Your collection is empty
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    Drop SVG files here, import an IcoMoon{" "}
                    <code className="font-fira text-xs text-fg">
                      selection.json
                    </code>
                    , or add icons from the store.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <ImportWrapper icons={icons} setIcons={onUpdate}>
                      <span className={buttonClassName("primary")}>
                        <Icon icon="upload" size={16} />
                        Import files
                      </span>
                    </ImportWrapper>
                    <Link
                      href="/store"
                      className={buttonClassName("secondary")}
                    >
                      Browse store
                    </Link>
                  </div>
                </div>
              )}
              {filteredIcons.map((icon) => (
                <IconPreview
                  icons={icons}
                  onContextMenu={handleContextMenu}
                  // @ts-ignore
                  setIcons={onUpdate}
                  copyIconName={handleCopyName}
                  inspectedIcon={inspectedIcon as IconSetItem}
                  inspect={setInspectedIcon}
                  key={icon.__meta?.id}
                  icon={icon}
                  isCollection
                />
              ))}
              {!search && !noIcons && !isDragging && onUpdate && (
                <NewIconBox icons={icons} setIcons={onUpdate} />
              )}
              {isDragging && (
                <span
                  className={clsx(
                    "pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-sm font-medium text-accent-fg",
                    "drag-outline bg-surface/95",
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
          inspectedIcon={inspectedIcon as IconSetItem}
          isCollection
        />
        {icons.length > 0 && onUpdate && (
          <IconSetPreviewFooter
            icons={icons}
            setIcons={onUpdate}
            isCollection
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
