import { useContext, useState } from "react";
import cx from "classnames";

import IconBox from "src/components/IconBox";
import Button, { ButtonVariants } from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import NewIconBox from "src/components/NewIconBox";
import Dialog from "src/components/Dialog";
import ImportButton from "src/components/ImportButton";
import Icon from "src/components/Icon";
import { IconsContext } from "src/context/iconsContext";
import { IconSetItem } from "src/types";

const IconSetPreview = () => {
  const { icons, setIcons } = useContext(IconsContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<IconSetItem[]>([]);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;

  const handleSearch = ({ target }) => {
    const searchKey = target.value;
    let newIcons = [];

    if (searchKey) {
      newIcons = icons.filter((icon) => {
        return icon.properties?.name
          .toLowerCase()
          .includes(searchKey.toLowerCase());
      });
    }

    setSearch(searchKey);
    setFilteredIcons(newIcons);
  };

  const clearAll = () => {
    setIcons([]);
    setIsDialogOpen(false);
  };

  const iconList = search ? filteredIcons : icons;

  return (
    <div className="flex flex-col divide-y divide-neutral-700 rounded-lg border border-neutral-700 bg-neutral-800 shadow-xl">
      <div className="flex items-center justify-between p-4">
        <label className="inline-flex w-64 items-center bg-neutral-200 bg-transparent py-1 text-neutral-300">
          <Icon icon="search" size={16} className="text-neutral-400" />
          <input
            className="ml-2 h-6 w-16 rounded-sm border-none bg-transparent text-sm outline-none"
            onKeyUp={handleSearch}
            placeholder="Search..."
          />
        </label>
        <div className="text-xs font-bold text-neutral-500">{`${icons.length} Icons`}</div>
      </div>
      <div className="grid max-h-[440px] snap-y grid-cols-3 gap-2 overflow-y-auto py-8 px-0 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9">
        {search && filteredIcons.length === 0 && (
          <p className="w-full text-sm text-neutral-500">No found icon.</p>
        )}
        {iconList.map((icon) => (
          <IconBox key={icon.__meta?.id} icon={icon} />
        ))}
        {!search && <NewIconBox />}
      </div>
      <Dialog
        onConfirm={clearAll}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        title="Remove All"
        description="Are you sure you want to clear all icons?"
      />
      <div className="flex flex-col items-center justify-between gap-3 divide-neutral-300 p-4 dark:divide-neutral-800 sm:flex-row">
        <ImportButton className="order-2 sm:order-1" />
        <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
          <Button
            variant={ButtonVariants.Ghost}
            onClick={() => setIsDialogOpen(true)}
            className="order-3 w-full sm:order-1 sm:w-auto "
          >
            Remove All
          </Button>
          {selectionCount > 0 && (
            <ExportButton
              variant={ButtonVariants.Secondary}
              icons={selectedIcons}
              className="order-2"
            >
              Export Selected
              <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-700 text-xs">
                {selectionCount}
              </span>
            </ExportButton>
          )}
          <ExportButton
            className="order-1 sm:order-3"
            variant={ButtonVariants.Success}
            icons={icons}
          >
            Export All
          </ExportButton>
        </div>
      </div>
    </div>
  );
};

export default IconSetPreview;
