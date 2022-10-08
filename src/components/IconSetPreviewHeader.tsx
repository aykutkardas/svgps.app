import { useState } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import SelectVariant from "src/components/SelectVariant";
import IconSetSearch from "src/components/IconSetSearch";
import ImportWrapper from "src/components/ImportWrapper";
import { deselectAll, selectAll } from "src/utils/iconActions";
import { Variant } from "src/icons";
import { IconSetItem } from "src/types";

interface IconSetPreviewHeaderProps {
  data?: any;
  variant?: Variant;
  noIcons: boolean;
  search: string;
  setSearch: Function;
  icons: IconSetItem[];
  setIcons: Function;
  isApp?: boolean;
}

const IconSetPreviewHeader = ({
  data,
  variant: initialVariant,
  noIcons,
  search,
  setSearch,
  icons,
  setIcons,
  isApp = false,
}: IconSetPreviewHeaderProps) => {
  const [variant, setVariant] = useState(initialVariant);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);

  const hasSelectedIcons = selectedIcons.length > 0;

  const handleDeselectAll = () => deselectAll(icons, setIcons);
  const handleSelectAll = () => selectAll(icons, setIcons);

  return (
    <div className="flex flex-col items-center justify-between space-y-2 p-4 sm:flex-row">
      {isApp ? (
        <ImportWrapper>
          <Button variant={ButtonVariants.Primary}>Import</Button>
        </ImportWrapper>
      ) : (
        <div className="flex flex-col text-center sm:text-left">
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
      <div className="flex flex-col-reverse items-center space-x-3 sm:flex-row">
        {!noIcons && (
          <Button
            variant={ButtonVariants.Ghost}
            className="text-xs !text-sky-500 hover:!text-sky-600"
            onClick={hasSelectedIcons ? handleDeselectAll : handleSelectAll}
          >
            {hasSelectedIcons ? "Deselect All" : "Select All"}
          </Button>
        )}
        <IconSetSearch setSearch={setSearch} disabled={noIcons && !search} />
        {!isApp && data.variants.length > 1 && (
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
