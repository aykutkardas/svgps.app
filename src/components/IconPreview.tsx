import { useState } from "react";
import cx from "clsx";

import Icon from "src/components/Icon";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { IconSetItem } from "src/types";

interface IconBoxProps {
  icon: IconSetItem;
  icons: IconSetItem[];
  setIcons: Function;
  disableRemove?: boolean;
}

const IconPreview = ({ icon, icons, setIcons }: IconBoxProps) => {
  const [selected, setSelected] = useState(icon.__meta?._selected);
  const iconSet = convertToIconSet(icons);

  const handleSelect = () => {
    const selectState = !selected;

    const newIcons = icons.map((item) => {
      if (item.properties.name !== icon.properties.name) return item;

      item.__meta = { _selected: selectState };
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
                  : "text-neutral-900 dark:text-white"
              }
            />
          </div>
        </div>
        <input
          className="mt-2 h-4 w-[60px] cursor-default bg-transparent text-center text-xs text-neutral-600 outline-none dark:text-neutral-400 md:w-[100px]"
          type="text"
          readOnly
          onClick={(e) => e.stopPropagation()}
          value={icon.properties.name}
        />
      </div>
    </div>
  );
};

export default IconPreview;
