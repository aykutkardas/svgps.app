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
      <input
        className={styles.IconPreviewName}
        type="text"
        onChange={handleChangeName}
        value={icon.name}
      />
      <div
        className={styles.IconPreviewSvg}
        dangerouslySetInnerHTML={{ __html: icon.content }}
      />
    </div>
  );
}
