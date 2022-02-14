import { useState } from "react";

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
      className={isIconSelected ? styles.IconSelected : styles.IconPreview}
      onClick={() => setIsIconSelected(!isIconSelected)}
    >
      <Icon
        icon={isIconSelected ? "checkmark" : "cross"}
        size={12}
        className={isIconSelected ? styles.Checkmark : styles.Cross}
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
