import { useContext, useState } from "react";
import cx from "classnames";

import styles from "./IconBox.module.css";

import Icon from "src/components/Icon";
import { IconSetItem } from "src/types";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { IconsContext } from "src/context/iconsContext";

interface IconBoxProps {
  icon: IconSetItem;
}

const IconBox = ({ icon }: IconBoxProps) => {
  const { icons, setIcons } = useContext(IconsContext);

  const [selected, setSelected] = useState(icon.__meta?._selected);
  const iconSet = convertToIconSet(icons);

  const prevId = icon.__meta?.id;

  const handleChangeName = (e) => {
    const newIcons = icons.map((icon) => {
      if (icon.__meta?.id === prevId) {
        icon.properties.name = e.target.value;
      }

      return icon;
    });
    setIcons(newIcons);
  };

  const handleDelete = (e) => {
    e.stopPropagation();

    if (selected) return;

    const newIcons = icons.filter((item) => item.__meta.id !== icon.__meta?.id);
    setIcons(newIcons);
  };

  const handleSelect = () => {
    const selectState = !selected;

    const newIcons = icons.map((item) => {
      if (item.__meta.id !== icon.__meta?.id) return item;

      item.__meta._selected = selectState;
      return item;
    });

    setSelected(selectState);
    setIcons(newIcons);
  };

  return (
    <div className={styles.IconBoxWrapper}>
      <div
        onClick={handleSelect}
        className={cx(styles.IconBox, {
          [styles.IconSelected]: selected,
        })}
      >
        <Icon
          icon={selected ? "checkmark" : "cross"}
          className={selected ? styles.CheckedIcon : styles.RemoveIcon}
          onClick={handleDelete}
          size={12}
        />
        <div className={styles.IconBoxSvgWrapper}>
          <Icon
            // @ts-ignore [TODO]: fix this
            iconSet={iconSet}
            icon={icon.properties.name}
            title={icon.properties.name}
            size={30}
          />
        </div>
      </div>
      <input
        className={styles.IconBoxInput}
        type="text"
        onChange={handleChangeName}
        onClick={(e) => e.stopPropagation()}
        value={icon.properties.name}
      />
    </div>
  );
};

export default IconBox;
