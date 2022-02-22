import { useState } from "react";
import cx from "classnames";

import Icon from "../Icon";
import styles from "./IconPreview.module.css";

export default function IconPreview({ icon, icons, setIcons }) {
  const [isIconSelected, setIsIconSelected] = useState(false);

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

  return (
    <div>
      <div
        onClick={() => setIsIconSelected(!isIconSelected)}
        className={cx(styles.IconPreview, {
          [styles.IconSelected]: isIconSelected,
        })}
      >
        <Icon
          icon={isIconSelected ? "checkmark" : "cross"}
          className={isIconSelected ? styles.CheckedIcon : styles.RemoveIcon}
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
