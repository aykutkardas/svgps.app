import { useState } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import SelectVariant from "src/components/SelectVariant";
import IconSetSearch from "src/components/IconSetSearch";

const IconSetPreviewHeader = ({
  data,
  variant: initialVariant,
  noIcons,
  search,
  setSearch,
  icons,
  setIcons,
}) => {
  const [variant, setVariant] = useState(
    initialVariant || data?.variants?.find((variant) => variant.default)
  );
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);

  const handleDeselect = () => {
    const deselectedIcons = icons.map((icon) => {
      icon.__meta = {
        ...(icon.__meta ?? {}),
        _selected: false,
      };
      return icon;
    });

    setIcons(deselectedIcons);
  };

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
        {selectedIcons.length > 0 && (
          <Button
            variant={ButtonVariants.Ghost}
            className="text-xs !text-sky-500 hover:!text-sky-600"
            onClick={handleDeselect}
          >
            Deselect All
          </Button>
        )}
        <IconSetSearch setSearch={setSearch} disabled={noIcons && !search} />
        {data.variants.length > 1 && (
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
