import { useState } from "react";
import cx from "classnames";

import Icon from "../Icon";
import styles from "./IconPreview.module.css";

export default function IconPreview({ icon, icons, setIcons }) {
  const [selected, setSelected] = useState(false);

  const prevName = icon.name;

  const handleChangeName = (e) => {
    const newIcons = icons.map((icon) => {
      if (icon.name === prevName) {
        icon.name = e.target.value;
      }

      return icon;
    });
    setIcons(newIcons);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (selected) return;

    const newIcons = icons.filter((item) => item.name !== icon.name);
    setIcons(newIcons);
  };

  const handleSelect = () => {
    const selectState = !selected;

    const newIcons = icons.map((item) => {
      if (item.name !== icon.name) return item;

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
        <div
          className={styles.IconPreviewSvgWrapper}
          dangerouslySetInnerHTML={{ __html: icon.content }}
        />
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
