import { useContext, useState } from "react";
import cx from "classnames";

import styles from "./IconPreviewArea.module.css";

import IconPreview from "src/components/IconPreview";
import Button, { ButtonVariants } from "src/components/Button";
import Download from "src/components/Download";
import NewIconBox from "src/components/NewIconBox";
import DialogBox from "src/components/DialogBox";
import { IconsContext } from "src/context/iconsContext";
import ImportButton from "src/components/ImportButton";
import Icon from "src/components/Icon";
import { IconSetItem } from "src/types";

const IconPreviewArea = () => {
  const EXPAND_LIMIT = 8;
  const { icons, setIcons } = useContext(IconsContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<IconSetItem[]>([]);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const hasIcons = icons.length;

  let iconsList = !search && expand ? icons : icons.slice(0, EXPAND_LIMIT);

  const toggleExpand = () => setExpand(!expand);

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
      <div className={styles.NoIcon}>
        <span>No icons to show</span>
        <ImportButton />
      </div>
    );
  }

  return (
    <div
      className={cx(styles.IconPreviewArea, {
        [styles.IconPreviewAreaExpanded]: expand,
      })}
    >
      <div className={styles.IconPreviewAreaHeader}>
        <div className={styles.Search}>
          <Icon icon="search" size={12} />
          <input
            className={styles.SearchInput}
            onKeyUp={handleSearch}
            placeholder={"Search..."}
          />
        </div>
        <div className={styles.SelectionCount}>{`${icons.length} Icons`}</div>
      </div>
      <div className={styles.IconList}>
        {(search ? filteredIcons : iconsList).map((icon) => (
          <IconPreview key={icon.__meta?.id} icon={icon} />
        ))}
        <NewIconBox />
        <span className={styles.ShowMore} onClick={toggleExpand}>
          <Icon icon="arrow-down" size={13} /> Show {expand ? "Less" : "More"}
        </span>
      </div>
      <DialogBox
        onConfirm={clearAll}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        Are you sure you want to remove all icons?
      </DialogBox>
      <div className={styles.Actions}>
        <Button
          variant={ButtonVariants.Ghost}
          onClick={() => setIsDialogOpen(true)}
        >
          Remove All
        </Button>
        {selectionCount > 0 && (
          <Download variant={ButtonVariants.Secondary} icons={selectedIcons}>
            Export Selected ({selectionCount})
          </Download>
        )}
        <Download icons={icons}>Export All</Download>
      </div>
    </div>
  );
};

export default IconPreviewArea;
