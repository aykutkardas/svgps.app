import { useContext, useState } from "react";
import cx from "classnames";

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
    <div>
      <div className="flex flex-col items-center justify-center">
        <div
          onClick={handleSelect}
          className={cx(
            "group w-[90px] h-[90px] flex items-center justify-center border bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-600 rounded-sm outline-none relative cursor-pointer select-none",
            {
              "border-green-500": selected,
              "border-neutral-300 dark:border-neutral-600": !selected,
            }
          )}
        >
          <Icon
            icon={selected ? "checkmark" : "cross"}
            className={cx(
              "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full p-1 text-white",
              {
                "bg-green-500 visible": selected,
                "bg-red-500 hover:bg-red-700 invisible group-hover:visible":
                  !selected,
              }
            )}
            onClick={handleDelete}
            size={20}
          />
          <div className="flex items-center justify-center">
            <Icon
              // @ts-ignore [TODO]: fix this
              iconSet={iconSet}
              icon={icon.properties.name}
              title={icon.properties.name}
              size={30}
              className="text-neutral-900 dark:text-white"
            />
          </div>
        </div>
        <input
          className="bg-transparent w-full text-center h-8 outline-none text-neutral-600 dark:text-neutral-50 text-sm"
          type="text"
          onChange={handleChangeName}
          onClick={(e) => e.stopPropagation()}
          value={icon.properties.name}
        />
      </div>
    </div>
  );
};

export default IconBox;
