import { useContext, useState } from "react";
import cx from "clsx";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

import IconSetPreviewHeader from "./IconSetPreviewHeader";
import IconPreview from "src/components/IconPreview";
import IconSetPreviewFooter from "src/components/IconSetPreviewFooter";
import { DragDropContext } from "src/context/DragDropContext";
import { IconSetItem } from "src/types";

const IconSetPreview = ({ iconSet, variant, data }) => {
  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);
  const [icons, setIcons] = useState(iconSet.icons);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");

  const filteredIcons = icons.filter((icon) =>
    icon.properties?.name.toLowerCase().includes(search.toLowerCase())
  );

  const noIcons = filteredIcons.length === 0;

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
      <IconSetPreviewHeader
        data={data}
        variant={variant}
        noIcons={noIcons}
        search={search}
        setSearch={setSearch}
      />
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
