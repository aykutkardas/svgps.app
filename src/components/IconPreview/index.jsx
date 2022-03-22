import styles from "./IconPreview.module.css";

import { useState } from "react";
import cx from "classnames";

import Icon from "src/components/Icon";

export default function IconPreview({ icon, icons, setIcons, iconSet }) {
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
        <Icon
          icon={selected ? "checkmark" : "cross"}
          className={selected ? styles.CheckedIcon : styles.RemoveIcon}
          onClick={handleDelete}
          size={12}
        />
        <div className={styles.IconPreviewSvgWrapper}>
          <Icon
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
}
