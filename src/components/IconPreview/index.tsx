import { useState } from "react";
import cx from "classnames";

import styles from "./IconPreview.module.css";

import Icon from "src/components/Icon";
import ReportIcon from "src/components/ReportIcon";
import { IconType, IconsType, IconSet } from "src/types";

interface IconPreviewProps {
  icon: IconType;
  iconSet: IconSet;
  icons: IconsType;
  setIcons: (icons: IconsType) => void;
}

const IconPreview = ({ icon, icons, setIcons, iconSet }: IconPreviewProps) => {
  const [selected, setSelected] = useState(icon._selected);

  const prevId = icon.id;

  const handleChangeName = (e) => {
    const newIcons = icons.map((icon) => {
      if (icon.id === prevId) {
        icon.name = e.target.value;
      }

      return icon;
    });
    setIcons(newIcons);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (selected) return;

    const newIcons = icons.filter((item) => item.id !== icon.id);
    setIcons(newIcons);
  };

  const handleSelect = () => {
    const selectState = !selected;

    const newIcons = icons.map((item) => {
      if (item.id !== icon.id) return item;

      item._selected = selectState;
      return item;
    });

    setSelected(selectState);
    setIcons(newIcons);
  };

  return (
    <div className={styles.IconPreviewWrapper}>
      <div
        onClick={handleSelect}
        className={cx(styles.IconPreview, {
          [styles.IconSelected]: selected,
        })}
      >
        <ReportIcon icon={icon} />
        <Icon
          icon={selected ? "checkmark" : "cross"}
          className={selected ? styles.CheckedIcon : styles.RemoveIcon}
          onClick={handleDelete}
          size={12}
        />
        <div className={styles.IconPreviewSvgWrapper}>
          <Icon
            // @ts-ignore [TODO]: fix this
            iconSet={iconSet}
            icon={icon.name}
            title={icon.name}
            size={30}
          />
        </div>
      </div>
      <input
        className={styles.IconPreviewInput}
        type="text"
        onChange={handleChangeName}
        onClick={(e) => e.stopPropagation()}
        value={icon.name}
      />
    </div>
  );
};

export default IconPreview;
