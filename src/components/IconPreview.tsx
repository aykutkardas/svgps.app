import clsx from "clsx";

import Icon from "src/components/Icon";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { copyAsSVG, copyName, select } from "src/utils/iconActions";
import { IconSetItem } from "src/types";

interface IconPreviewProps {
  inspectedIcon: IconSetItem;
  icon: IconSetItem;
  icons: IconSetItem[];
  inspect: Function;
  copyIconName: Function;
  setIcons: Function;
  onContextMenu: Function;
  isApp?: boolean;
}

const IconPreview = ({
  icon,
  icons,
  inspectedIcon,
  onContextMenu,
  inspect,
  setIcons,
  isApp = false,
}: IconPreviewProps) => {
  const selected = icon.__meta?._selected;
  const iconSet = convertToIconSet(icons);
  const prevId = icon.__meta?.id;

  const alreadyInspected =
    icon.properties.name === inspectedIcon?.properties.name;

  const handleInspect = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (inspectedIcon && !alreadyInspected) {
      inspect(inspectedIcon);
    } else {
      inspect(alreadyInspected ? null : icon);
    }
  };

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
    // [NOTE]: this is a hack to fix upload trigger
    setTimeout(() => setIcons(newIcons));
  };

  const handleCopyAsSVG = (e) => {
    e.stopPropagation();
    copyAsSVG(icon, 32);
  };

  const handleSelect = () => select(icon, icons, setIcons);
  const handleCopyIconName = () => copyName(icon);

  return (
    <div className="mb-3 flex flex-col items-center justify-center">
      <div
        onContextMenu={(event) => onContextMenu(event, icon)}
        onClick={handleSelect}
        className={clsx(
          "group flex items-center justify-center",
          "h-16 w-16 sm:h-[70px] sm:w-[70px]",
          "relative cursor-pointer select-none bg-transparent outline-none",
          "rounded-lg border",
          selected
            ? "border-sky-500"
            : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 hover:dark:border-neutral-400"
        )}
      >
        {isApp && (
          <Icon
            icon="trash"
            className={clsx(
              "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 rounded-full p-1 text-white",
              "select-none bg-red-500 opacity-0 transition-opacity duration-100 hover:bg-red-700 group-hover:select-all group-hover:opacity-100"
            )}
            onClick={handleDelete}
            size={22}
          />
        )}
        <Icon
          icon="eye-open"
          className={clsx(
            "absolute bottom-0 translate-y-2 -translate-x-2 rounded-full bg-purple-500 p-1 text-white hover:bg-purple-600",
            "select-none opacity-0 group-hover:select-all group-hover:opacity-100",
            selected ? "left-7" : "left-0"
          )}
          size={22}
          onClick={handleInspect}
        />
        <Icon
          icon="copy"
          className={clsx(
            "absolute bottom-0 translate-y-2 -translate-x-2 rounded-full bg-sky-500 p-1 text-white hover:bg-sky-600",
            "-right-5 select-none opacity-0 group-hover:select-all group-hover:opacity-100"
          )}
          size={22}
          onClick={handleCopyAsSVG}
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
        className="mt-2 h-4 w-16 bg-transparent text-center text-xs text-neutral-600 outline-none  dark:text-neutral-400  sm:w-[70px]"
        type="text"
        readOnly={!isApp}
        onChange={isApp ? handleChangeName : null}
        onClick={!isApp ? handleCopyIconName : (e) => e.stopPropagation()}
        value={icon.properties.name}
      />
    </div>
  );
};

export default IconPreview;
