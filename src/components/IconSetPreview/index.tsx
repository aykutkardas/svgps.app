import { useContext, useState } from "react";

import IconBox from "src/components/IconBox";
import Button, { ButtonVariants } from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import NewIconBox from "src/components/NewIconBox";
import Dialog from "src/components/Dialog";
import ImportButton from "src/components/ImportButton";
import Icon from "src/components/Icon";
import { IconsContext } from "src/context/iconsContext";
import { IconSetItem } from "src/types";

import styles from "./IconSetPreview.module.css";

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
      <div className="flex flex-col items-center justify-center rounded-md p-8 border border-dashed border-neutral-700">
        <span className="text-neutral-900 dark:text-white mb-2">
          No icons to show
        </span>
        <ImportButton />
      </div>
    );
  }

  return (
    <div className="w-full my-24">
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-500">
          <Icon icon="search" size={12} />
          <input
            className="bg-transparent border-none text-xs outline-none ml-2 h-6 w-16 rounded-sm"
            onKeyUp={handleSearch}
            placeholder="Search..."
          />
        </div>
        <div className="text-xs text-neutral-500 font-bold">{`${icons.length} Icons`}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2 rounded-md p-8 border border-dashed border-neutral-700">
        {(search ? filteredIcons : icons).map((icon) => (
          <IconBox key={icon.__meta?.id} icon={icon} />
        ))}
        <NewIconBox />
      </div>
      <Dialog
        onConfirm={clearAll}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        Are you sure you want to remove all icons?
      </Dialog>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
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
        <ExportButton icons={icons}>Export All</ExportButton>
      </div>
    </div>
  );
};

export default IconSetPreview;
