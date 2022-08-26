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
  const hasIcons = icons.length;

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

  if (!hasIcons) {
    return (
      <div
        className={cx(
          "my-auto flex flex-col items-center justify-center p-8",
          "rounded-md border border-dashed border-neutral-400 dark:border-neutral-600",
          "bg-neutral-100 shadow-lg dark:bg-neutral-800"
        )}
      >
        <span className="m-5 mb-7 text-sm text-neutral-700 dark:text-neutral-400">
          No icons to show
        </span>
        <ImportButton />
      </div>
    );
  }

  return (
    <div className="relative my-[150px] w-full">
      <div className="mb-3 flex items-center justify-between px-3">
        <div className="inline-flex items-center bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-500">
          <Icon icon="search" size={12} />
          <input
            className="ml-2 h-6 w-16 rounded-sm border-none bg-transparent text-xs outline-none"
            onKeyUp={handleSearch}
            placeholder="Search..."
          />
        </div>
        <div className="text-xs font-bold text-neutral-500">{`${icons.length} Icons`}</div>
      </div>
      <div
        className={cx(
          "grid grid-cols-3 gap-2 rounded-md p-8 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9",
          "border border-dashed border-neutral-400 bg-neutral-100 shadow-lg dark:border-neutral-600 dark:bg-neutral-800"
        )}
      >
        {search && filteredIcons.length === 0 && (
          <p className="w-full text-sm text-neutral-500">No found icon.</p>
        )}
        {(search ? filteredIcons : icons).map((icon) => (
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
      <div className="mt-6 flex flex-col items-center justify-center gap-3 divide-x divide-neutral-300 dark:divide-neutral-800 sm:flex-row">
        <ImportButton />
        <div className="flex gap-3">
          <Button
            variant={ButtonVariants.Ghost}
            onClick={() => setIsDialogOpen(true)}
            className="w-full sm:w-auto"
          >
            Remove All
          </Button>
          {selectionCount > 0 && (
            <ExportButton
              variant={ButtonVariants.Secondary}
              icons={selectedIcons}
            >
              Export Selected ({selectionCount})
            </ExportButton>
          )}
          <ExportButton variant={ButtonVariants.Success} icons={icons}>
            Export All
          </ExportButton>
        </div>
      </div>
    </div>
  );
};

export default IconSetPreview;
