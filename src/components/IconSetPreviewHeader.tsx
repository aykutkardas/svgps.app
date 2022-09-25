import { useState } from "react";

import SelectVariant from "./SelectVariant";
import IconSetSearch from "./IconSetSearch";

const Variants = {
  regular: "Regular",
  fill: "Fill",
  sharp: "Sharp",
  twotone: "Twotone",
  bold: "Bold",
  light: "Light",
  thin: "Thin",
  rounded: "Rounded",
  outline: "Outline",
  "outline-sharp": "Outline-Sharp",
  "outline-rounded": "Outline-Rounded",
};

const IconSetPreviewHeader = ({
  data,
  variant: initialVariant,
  noIcons,
  search,
  setSearch,
}) => {
  const [variant, setVariant] = useState(Variants[initialVariant]);

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex-col">
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
      <div className="flex items-center space-x-3">
        <IconSetSearch setSearch={setSearch} disabled={noIcons && !search} />
        {data.variants && (
          <SelectVariant
            variants={data.variants}
            iconSetSlug={data.slug}
            variant={variant}
            setVariant={setVariant}
          />
        )}
      </div>
    </div>
  );
};

export default IconSetPreviewHeader;
