import { useContext, useState } from "react";
import cx from "classnames";

import Icon from "src/components/Icon";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { IconsContext } from "src/context/IconsContext";
import { IconSetItem } from "src/types";

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
    <div className="snap-center scroll-mt-4">
      <div className="mb-3 flex flex-col items-center justify-center">
        <div
          onClick={handleSelect}
          className={cx(
            "group flex items-center justify-center",
            "h-[60px] w-[60px] md:h-[100px] md:w-[100px]",
            "relative cursor-pointer select-none bg-transparent outline-none",
            "rounded-lg border",
            selected
              ? "border-sky-500"
              : "border-neutral-300 dark:border-neutral-600 hover:dark:border-neutral-400"
          )}
        >
          <Icon
            icon={selected ? "check" : "close"}
            className={cx(
              "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full p-1 text-white",
              selected
                ? "visible bg-sky-500"
                : "invisible bg-red-500 hover:bg-red-700 group-hover:visible"
            )}
            onClick={handleDelete}
            size={22}
          />
          <div className="flex items-center justify-center">
            <Icon
              // @ts-ignore [TODO]: fix this
              iconSet={iconSet}
              icon={icon.properties.name}
              title={icon.properties.name}
              size={24}
              className={
                selected
                  ? "text-sky-500 dark:text-sky-500"
                  : "text-neutral-900 dark:text-white"
              }
            />
          </div>
        </div>
        <input
          className="mt-2 w-[60px] bg-transparent text-center text-xs text-neutral-600 outline-none dark:text-neutral-400 md:w-[100px]"
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
