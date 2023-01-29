import { useContext, useState } from "react";
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
import { Variant } from "src/iconSets";
import IconSetPreviewSearchFooter from "./IconSetPreviewSearchFooter";
import IconSetPreviewSearchHeader from "./IconSetPreviewSearchHeader";

interface IconSetPreviewProps {
  iconSet?: IconSet;
  variant?: Variant;
  data?: any;
  isCollection?: boolean;
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

const EmptyWrapper = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const IconSetPreview = ({
  iconSet,
  variant,
  data,
  loading = false,
  isCollection = false,
  isSearch = false,
  paginationData,
  onPageChange,
}: IconSetPreviewProps) => {
  const [contextMenu, setContextMenu] = useState<Record<string, any>>(null);
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);

  // icons
  let [icons, setIcons] = useState(iconSet?.icons || []);
  const [filteredIcons, setFilteredIcons] = useState(icons);

  if (isCollection) {
    ({ icons, setIcons } = useContext(IconsContext));
  }
  // -

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

  const Wrapper = isCollection ? ImportDropWrapper : EmptyWrapper;

  return (
    <>
      <div
        onClick={() => setContextMenu(null)}
        className={clsx(
          "relative flex flex-col divide-y overflow-hidden rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
          "divide-neutral-200 border-neutral-200 bg-neutral-100",
          {
            "h-[calc(100vh-6rem)]": !isSearch,
            "h-[calc(100vh-16rem)]": isSearch,
          }
        )}
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
            isCollection={isCollection}
          />
        )}
        {isSearch && <IconSetPreviewSearchHeader />}
        <div
          className={clsx(
            "flex-1 flex-wrap overflow-x-hidden",
            contextMenu ? "overflow-y-hidden" : "overflow-y-auto"
          )}
        >
          <Wrapper
            className={clsx("h-full overflow-y-auto overflow-x-hidden", {
              "pointer-events-none opacity-60": loading,
            })}
          >
            <div
              className={clsx(
                "relative  grid-cols-4 gap-1 px-3 transition sm:grid-cols-7",
                {
                  "h-full": isDragging,
                  "pb-20 pt-6": !isSearch,
                  "pt-5": isSearch,
                },
                filteredIcons.length === 0
                  ? "flex items-center justify-center"
                  : "grid",
                noIcons
                  ? "flex h-full flex-wrap items-center justify-center"
                  : {
                      "lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16":
                        !isSearch,
                      "lg:grid-cols-10 xl:grid-cols-12": isSearch,
                    }
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
                  key={
                    isSearch
                      ? icon._id
                      : isCollection
                      ? icon.__meta?.id
                      : icon.properties.name
                  }
                  icon={icon}
                  isCollection={isCollection}
                  isSearch={isSearch}
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
          </Wrapper>
        </div>
        <IconSetPreviewInspect
          isOpen={!!inspectedIcon}
          setIsOpen={setInspectedIcon}
          iconSet={currentIconSet}
          inspectedIcon={inspectedIcon}
          inspect={setInspectedIcon}
          isCollection={isCollection}
        />
        {!isSearch && icons.length > 0 && (
          <IconSetPreviewFooter
            iconSetData={data}
            icons={icons}
            setIcons={setIcons}
            isCollection={isCollection}
          />
        )}
        {isSearch && paginationData.pageSize > 1 && (
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
