import { useState } from "react";
import clsx from "clsx";

import Icon from "src/components/Icon";
import Button from "src/components/Button";
import SelectVariant from "src/components/SelectVariant";
import IconSetSearch from "src/components/IconSetSearch";
import ImportWrapper from "src/components/ImportWrapper";
import CollectionAction from "src/components/CollectionAction";
import { deselectAll, selectAll } from "src/utils/iconActions";
import { Variant } from "src/iconSets";
import { IconSetItem } from "src/types";

interface IconSetPreviewHeaderProps {
  data?: any;
  variant?: Variant;
  noIcons: boolean;
  search: string;
  setSearch: Function;
  icons: IconSetItem[];
  setIcons: Function;
  onRename?: Function;
  onDelete?: Function;
  isCollection?: boolean;
}

const IconSetPreviewHeader = ({
  data,
  variant: initialVariant,
  noIcons,
  search,
  setSearch,
  icons,
  onRename,
  onDelete,
  setIcons,
  isCollection,
}: IconSetPreviewHeaderProps) => {
  const [variant, setVariant] = useState(initialVariant);
  const [editMode, setEditMode] = useState(false);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const [name, setName] = useState(data?.name || "");

  const hasSelectedIcons = selectedIcons.length > 0;

  const handleDeselectAll = () => deselectAll(icons, setIcons);
  const handleSelectAll = () => selectAll(icons, setIcons);
  const handleEdit = () => setEditMode(true);
  const handleDelete = () => onDelete();
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const saveCollectionName = () => {
    setEditMode(false);
    if (!name || data.name === name) return;

    onRename(name);
  };

  return (
    <div className="z-10 flex flex-col items-center justify-between space-y-2 p-4 sm:flex-row">
      {isCollection && (
        <div className="flex w-full items-center text-center sm:text-left">
          {data?.name && (
            <CollectionAction onEdit={handleEdit} onDelete={handleDelete} />
          )}
          {!editMode ? (
            <h4
              className={clsx(
                "text-sm text-neutral-800 dark:text-neutral-300",
                data?.name && "ml-2"
              )}
            >
              {data?.name || "Collection"}
            </h4>
          ) : (
            <>
              <input
                type="text"
                className="text-md rounded-md bg-neutral-900 px-2 py-2 text-white placeholder:text-neutral-500 md:text-sm"
                defaultValue={data?.name}
                onChange={handleChangeName}
              />
              <Icon
                icon="check"
                size={30}
                onClick={saveCollectionName}
                className="shrink-0 cursor-pointer p-1 text-neutral-400 hover:text-neutral-200"
              />
            </>
          )}
        </div>
      )}

      {!isCollection && data && (
        <div className="flex w-full flex-col text-center sm:text-left">
          <h4 className="text-sm text-neutral-800 dark:text-neutral-300">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-500 dark:hover:text-neutral-200"
            >
              {data.name}
            </a>
            <a
              href={data.licenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded-md bg-neutral-200 p-1 text-[10px] text-neutral-400 hover:text-neutral-500 dark:bg-neutral-600/30 dark:text-neutral-500 dark:hover:text-neutral-400"
            >
              {data.licence}
            </a>
          </h4>
          <span className="mt-0 text-xs text-neutral-700 dark:text-neutral-500">
            {data.creator}
          </span>
        </div>
      )}
      <div className="flex w-full flex-row-reverse items-center justify-between space-x-3 sm:flex-row sm:justify-end">
        {!noIcons && (
          <Button
            variant="ghost"
            className="!ring-ofset-0 hidden px-1 text-xs !text-neutral-400 !ring-offset-0 hover:!text-neutral-300 focus:!ring-0 dark:!ring-offset-0 dark:focus:!outline-none dark:focus:!ring-0 sm:block"
            onClick={hasSelectedIcons ? handleDeselectAll : handleSelectAll}
          >
            {hasSelectedIcons ? "Deselect All" : "Select All"}
          </Button>
        )}
        <IconSetSearch
          search={search}
          setSearch={setSearch}
          disabled={noIcons && !search}
        />
        {!isCollection && data?.variants?.length > 1 && (
          <SelectVariant
            variants={data.variants}
            iconSetSlug={data.slug}
            variant={variant}
            setVariant={setVariant}
          />
        )}
        {isCollection && (
          <ImportWrapper icons={icons} setIcons={setIcons}>
            <Button variant="secondary">Import</Button>
          </ImportWrapper>
        )}
      </div>
    </div>
  );
};

export default IconSetPreviewHeader;
