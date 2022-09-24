import { useState } from "react";
import cx from "clsx";

import Icon from "src/components/Icon";
import SelectVariant from "./SelectVariant";

const Variants = {
  outline: "Outline",
  fill: "Fill",
  sharp: "Sharp",
  twotone: "Twotone",
  bold: "Bold",
  light: "Light",
  thin: "Thin",
};

const IconSetPreviewHeader = ({
  data,
  variant: initialVariant,
  noIcons,
  search,
  setSearch,
}) => {
  const [variant, setVariant] = useState(Variants[initialVariant]);

  const handleSearch = ({ target }) => setSearch(target.value);

  return (
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
  );
};

export default IconSetPreviewHeader;
