import { useContext, useState } from "react";
import cx from "clsx";

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
            icon="close"
            className={cx(
              "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full p-1 text-white",
              "invisible bg-red-500 hover:bg-red-700 group-hover:visible"
            )}
            onClick={handleDelete}
            size={22}
          />
          {selected && (
            <Icon
              icon="check"
              className="absolute bottom-0 left-0 translate-y-2 -translate-x-2 rounded-full bg-sky-500 p-1 text-white"
              size={22}
            />
          )}
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
                  : "text-neutral-600 dark:text-neutral-200"
              }
            />
          </div>
        </div>
        <input
          className="mt-2 h-4 w-[60px] bg-transparent text-center text-xs text-neutral-600 outline-none dark:text-neutral-400 md:w-[100px]"
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
