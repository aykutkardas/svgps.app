import { useContext, useEffect, useState } from "react";
import clsx from "clsx";

import IconSetPreviewHeader from "src/components/IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import IconSetPreviewContextMenu from "src/components/IconSetPreviewContextMenu";
import IconSetPreviewInspect from "src/components/IconSetPreviewInspect";
import IconSetPreviewSearchFooter from "src/components/IconSetPreviewSearchFooter";
import IconSetPreviewSearchHeader from "src/components/IconSetPreviewSearchHeader";
import Dialog from "src/components/Dialog";
import Icon from "src/components/Icon";
import { DragDropContext } from "src/context/DragDropContext";
import { copyName } from "src/utils/iconActions";
import useDebounce from "src/hooks/useDebounce";
import { IconSet, IconSetItem } from "src/types";
import { IconSetData, Variant } from "src/iconSets";
import useCollectionStore from "src/stores/collection";

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
  const [dialog, setDialog] = useState(false);
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem | null>(null);
  const [willAddIcons, setWillAddIcons] = useState<IconSetItem[]>([]);
  const [icons, setIcons] = useState(iconSet?.icons || []);
  const [filteredIcons, setFilteredIcons] = useState(icons);
  const [search, setSearch] = useState("");
  const [contextMenu, setContextMenu] = useState<Record<
    string,
    unknown
  > | null>(null);

  const { collections, addIconToSelectedCollection } = useCollectionStore();
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

  const availableCollection =
    collections?.map((collection) => ({
      label: collection.name,
      action: () => {
        addIconToSelectedCollection(collection.id, willAddIcons);
        setWillAddIcons([]);
        setDialog(false);
      },
    })) || [];

  const selectCollection = (icons: IconSetItem[]) => {
    setWillAddIcons(icons);
    setDialog(true);
  };
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
          },
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
                    },
              )}
            >
              {search && noIcons && !isDragging && (
                <p className="w-48 p-4 text-sm text-neutral-500">
                  No icons found.
                </p>
              )}

              {loading && (
                <span className="font-normal text-white">Loading</span>
              )}
              {filteredIcons.map((icon) => (
                <IconPreview
                  key={icon.id}
                  icons={icons}
                  onContextMenu={handleContextMenu}
                  setIcons={setIcons}
                  copyIconName={handleCopyName}
                  inspectedIcon={inspectedIcon as IconSetItem}
                  inspect={setInspectedIcon}
                  selectCollection={selectCollection}
                  icon={icon}
                  isSearch={isSearch}
                />
              ))}
              {isDragging && (
                <span
                  className={clsx(
                    "pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-neutral-500",
                    "drag-outline bg-neutral-100 dark:bg-neutral-800",
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
        />
        {!isSearch && icons.length > 0 && (
          <IconSetPreviewFooter
            iconSetData={data}
            icons={icons}
            setIcons={setIcons}
            selectCollection={selectCollection}
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
      <Dialog
        isOpen={dialog}
        // @ts-ignore
        setIsOpen={setDialog}
        className="!p-4"
        disableAction
      >
        <div className="mb-4 flex w-40 items-center text-sm text-neutral-200">
          <Icon icon="squares-plus" size={19} className="mr-2" />
          Select Collection
        </div>
        {availableCollection.map((collection) => (
          <div
            key={collection.label}
            className="my-1 cursor-pointer rounded-lg bg-neutral-600/20 p-2 text-sm text-neutral-300 hover:bg-violet-400 hover:text-white"
            onClick={collection.action}
          >
            {collection.label}
          </div>
        ))}
      </Dialog>
    </>
  );
};

export default IconSetPreview;
