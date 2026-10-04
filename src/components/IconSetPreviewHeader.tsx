import { useState } from "react";

import Button from "src/components/Button";
import Icon from "src/components/Icon";
import SelectVariant from "src/components/SelectVariant";
import IconSetSearch from "src/components/IconSetSearch";
import ImportWrapper from "src/components/ImportWrapper";
import { deselectAll, selectAll } from "src/utils/iconActions";
import type { IconSetData, Variant } from "src/iconSets";
import type { IconSetItem } from "src/types";

interface IconSetPreviewHeaderProps {
  data?: Partial<IconSetData>;
  variant?: Variant;
  noIcons: boolean;
  search: string;
  icons: IconSetItem[];
  isCollection?: boolean;
  setSearch: (key: string) => void;
  setIcons?: (icons: IconSetItem[]) => void;
}

const IconSetPreviewHeader = ({
  data,
  variant: initialVariant,
  noIcons,
  search,
  setSearch,
  icons,
  setIcons,
  isCollection,
}: IconSetPreviewHeaderProps) => {
  const [variant, setVariant] = useState(initialVariant);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);

  const hasSelectedIcons = selectedIcons.length > 0;

  const handleDeselectAll = () => deselectAll(icons, setIcons);
  const handleSelectAll = () => selectAll(icons, setIcons);

  return (
    <div className="z-10 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      {isCollection && (
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-fg">
            <Icon icon="package" size={18} />
          </span>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-fg">Collection</h1>
            <p className="text-xs text-fg-subtle">Saved in this browser</p>
          </div>
        </div>
      )}

      {!isCollection && data && (
        <div className="flex min-w-0 flex-col">
          <h1 className="flex items-center gap-2 text-base font-semibold text-fg">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate transition hover:text-accent-fg"
            >
              {data.name}
            </a>
            <a
              href={data.licenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-md border border-line bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-fg-subtle transition hover:text-fg-muted"
            >
              {data.licence}
            </a>
          </h1>
          <span className="truncate text-xs text-fg-subtle">
            {data.creator}
          </span>
        </div>
      )}
      <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
        {!isCollection && (data?.variants?.length || 0) > 1 && (
          <SelectVariant
            variants={data?.variants as Variant[]}
            iconSetSlug={data?.slug as string}
            variant={variant as Variant}
            setVariant={setVariant}
          />
        )}
        <IconSetSearch
          search={search}
          setSearch={setSearch}
          disabled={noIcons && !search}
        />
        {!noIcons && (
          <Button
            variant="ghost"
            className="h-9 shrink-0 px-3 text-xs"
            onClick={hasSelectedIcons ? handleDeselectAll : handleSelectAll}
          >
            {hasSelectedIcons ? "Deselect All" : "Select All"}
          </Button>
        )}
        {isCollection && (
          <ImportWrapper icons={icons} setIcons={setIcons}>
            <Button variant="secondary">
              <Icon icon="upload" size={15} />
              Import
            </Button>
          </ImportWrapper>
        )}
      </div>
    </div>
  );
};

export default IconSetPreviewHeader;
