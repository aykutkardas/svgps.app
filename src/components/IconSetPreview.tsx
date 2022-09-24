import { useContext, useState } from "react";
import cx from "clsx";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

import Icon from "src/components/Icon";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import { DragDropContext } from "src/context/DragDropContext";
import { IconSetItem } from "src/types";
import SelectVariant from "./SelectVariant";

const Variants = {
  outline: "Outline",
  fill: "Fill",
};

const IconSetPreview = ({ iconSet, variant: initialVariant, data }) => {
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);
  const [icons, setIcons] = useState(iconSet.icons);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");
  const [variant, setVariant] = useState(Variants[initialVariant]);

  const filteredIcons = icons.filter((icon) =>
    icon.properties?.name.toLowerCase().includes(search.toLowerCase())
  );

  const noIcons = filteredIcons.length === 0;

  const handleSearch = ({ target }) => setSearch(target.value);

  const handleCopyName = (icon) => {
    const iconName = icon.properties.name;
    copy(iconName);
    toast.success(`"${iconName}" copied!`);
  };

  return (
    <div
      className={cx(
        "relative flex h-[600px] flex-col divide-y overflow-hidden rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
        "divide-neutral-200 border-neutral-200 bg-neutral-100"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          {data.variants && (
            <SelectVariant
              variants={data.variants}
              iconSetSlug={data.slug}
              variant={variant}
              setVariant={setVariant}
            />
          )}
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
        </div>
        <div className="flex-col text-right">
          <h4 className="text-sm text-neutral-800 dark:text-neutral-300">
            <a
              href={data.licenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-1 rounded-md bg-neutral-200 p-1 text-[10px] text-neutral-400 hover:text-neutral-500 dark:bg-neutral-600/30 dark:text-neutral-500 dark:hover:text-neutral-400"
            >
              {data.licence}
            </a>
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-500 dark:hover:text-neutral-200"
            >
              {data.name}
            </a>
          </h4>
          <span className="mt-0 text-xs text-neutral-700 dark:text-neutral-500">
            {data.creator}
          </span>
        </div>
      </div>
      <div
        className={cx(
          "relative flex-1 snap-y grid-cols-4 gap-1 overflow-y-auto overflow-x-hidden py-8 px-0 pb-20 transition",
          noIcons
            ? "flex items-center justify-center"
            : "grid sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-14"
        )}
      >
        {search && noIcons && !isDragging && (
          <p className="w-48 p-4 text-sm text-neutral-500">No icons found.</p>
        )}
        {filteredIcons.map((icon) => (
          <IconPreview
            icons={icons}
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
      <IconSetPreviewFooter
        icons={icons}
        inspectedIcon={inspectedIcon}
        iconSet={iconSet}
        copyIconName={handleCopyName}
        inspect={setInspectedIcon}
      />
    </div>
  );
};

export default IconSetPreview;
