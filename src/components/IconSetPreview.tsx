import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import IconSetPreviewHeader from "src/components/IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import IconSetPreviewContextMenu from "src/components/IconSetPreviewContextMenu";
import IconSetPreviewInspect from "src/components/IconSetPreviewInspect";
import IconSetPreviewSearchFooter from "src/components/IconSetPreviewSearchFooter";
import IconSetPreviewSearchHeader from "src/components/IconSetPreviewSearchHeader";
import Icon from "src/components/Icon";
import { DragDropContext } from "src/context/DragDropContext";
import { copyName } from "src/utils/iconActions";
import useDebounce from "src/hooks/useDebounce";
import { IconSet, IconSetItem } from "src/types";
import { IconSetData, Variant } from "src/iconSets";

interface IconSetPreviewProps {
  iconSet: IconSet;
  variant?: Variant;
  data?: Partial<IconSetData>;
  isSearch?: boolean;
  loading?: boolean;
  paginationData?: {
    currentPage: number;
    pageSize: number;
    count: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

const IconSetPreview = ({
  iconSet,
  variant,
  data,
  loading = false,
  isSearch = false,
  paginationData,
  onPageChange,
}: IconSetPreviewProps) => {
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem | null>(null);
  const [icons, setIcons] = useState(iconSet?.icons || []);
  const [filteredIcons, setFilteredIcons] = useState(icons);
  const [search, setSearch] = useState("");
  const [contextMenu, setContextMenu] = useState<Record<
    string,
    unknown
  > | null>(null);

  const { isDragging } = useContext(DragDropContext);

  useEffect(() => {
    setIcons(iconSet?.icons || []);
    setFilteredIcons(iconSet?.icons || []);
  }, [iconSet]);

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
        className={clsx("panel divide-y divide-line", {
          "h-full": !isSearch,
          "h-[calc(100dvh-12rem)] min-h-[420px]": isSearch,
        })}
      >
        {!isSearch && (
          <IconSetPreviewHeader
            data={data}
            variant={variant}
            noIcons={noIcons}
            search={search}
            setSearch={setSearch}
            icons={icons}
            setIcons={setIcons}
          />
        )}
        {isSearch && <IconSetPreviewSearchHeader />}
        <div
          className={clsx(
            "flex-1 flex-wrap overflow-x-hidden",
            contextMenu ? "overflow-y-hidden" : "overflow-y-auto",
          )}
        >
          <div
            className={clsx("h-full overflow-y-auto overflow-x-hidden", {
              "pointer-events-none opacity-60": loading,
            })}
          >
            <div
              className={clsx(
                "relative gap-2 p-4 transition sm:p-5",
                { "h-full": isDragging || loading },
                noIcons
                  ? "flex h-full flex-wrap items-center justify-center"
                  : "grid grid-cols-[repeat(auto-fill,minmax(76px,1fr))] content-start sm:grid-cols-[repeat(auto-fill,minmax(100px,1fr))]",
              )}
            >
              {search && noIcons && !isDragging && !loading && (
                <div className="flex flex-col items-center gap-2 p-6 text-center">
                  <Icon icon="search" size={22} className="text-fg-subtle" />
                  <p className="text-sm text-fg-muted">No icons found.</p>
                </div>
              )}

              {loading && (
                <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm text-fg-muted">
                  <Icon icon="arrow-path" size={18} className="animate-spin" />
                  Loading icons…
                </span>
              )}
              {!loading &&
                filteredIcons.map((icon) => (
                  <IconPreview
                    key={icon.id}
                    icons={icons}
                    onContextMenu={handleContextMenu}
                    setIcons={setIcons}
                    copyIconName={handleCopyName}
                    inspectedIcon={inspectedIcon as IconSetItem}
                    inspect={setInspectedIcon}
                    icon={icon}
                    isSearch={isSearch}
                  />
                ))}
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
          </div>
        </div>
        <IconSetPreviewInspect
          isOpen={!!inspectedIcon}
          setIsOpen={setInspectedIcon}
          iconSet={iconSet}
          inspectedIcon={inspectedIcon as IconSetItem}
          isSearch={isSearch}
        />
        {!isSearch && icons.length > 0 && (
          <IconSetPreviewFooter
            iconSetData={data}
            icons={icons}
            setIcons={setIcons}
          />
        )}
        {isSearch &&
          onPageChange &&
          paginationData &&
          paginationData.pageSize > 1 && (
            <IconSetPreviewSearchFooter
              loading={loading}
              paginationData={paginationData}
              onPageChange={onPageChange}
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
