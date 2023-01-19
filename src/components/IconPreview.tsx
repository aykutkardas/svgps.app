import clsx from "clsx";

import Icon from "src/components/Icon";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { copyAsSVG, copyName, select, sendToApp } from "src/utils/iconActions";
import { IconSetItem } from "src/types";
import { useContext } from "react";
import { IconsContext } from "src/context/IconsContext";

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
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);

  const selected = icon.__meta?._selected;
  const iconSet = convertToIconSet(icons);
  const prevId = icon.__meta?.id;

  const alreadyInspected =
    icon.properties.name === inspectedIcon?.properties.name;

  const handleInspect = (e) => {
    window?.hardal?.trackEvent("INSXT83EH");
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

  const handleSendToApp = (e) => {
    e.stopPropagation();
    sendToApp([icon], appIcons, setAppIcons);
  };

  return (
    <div className="relative mb-3 flex flex-col items-center justify-center">
      <div
        onContextMenu={(event) => onContextMenu(event, icon)}
        onClick={handleSelect}
        className={clsx(
          "group flex items-center justify-center overflow-hidden",
          "h-16 w-16 sm:h-[90px] sm:w-[90px]",
          "relative cursor-pointer select-none bg-transparent outline-none",
          "rounded-lg border",
          selected
            ? "border-purple-500"
            : "border-neutral-200 hover:border-purple-500/50 dark:border-neutral-700/40 hover:dark:border-purple-400/50"
        )}
      >
        {isApp && (
          <Icon
            icon="trash"
            className={clsx(
              "absolute rounded-md bg-red-500 p-1 text-white hover:opacity-60",
              "-top-6 -right-6 select-none transition-all duration-200 group-hover:top-1 group-hover:right-1"
            )}
            onClick={handleDelete}
            size={22}
          />
        )}
        {!isApp && (
          <Icon
            icon="window-plus"
            className={clsx(
              "absolute rounded-md bg-violet-500 p-1 text-white hover:opacity-60",
              "-top-6 -left-6 select-none transition-all duration-200 group-hover:top-1 group-hover:left-1"
            )}
            onClick={handleSendToApp}
            size={22}
          />
        )}
        <Icon
          icon="inspect"
          className={clsx(
            "absolute rounded-md bg-purple-500 p-1 text-white hover:opacity-60",
            "-bottom-6 -left-6 select-none transition-all duration-200 group-hover:bottom-1 group-hover:left-1"
          )}
          size={22}
          onClick={handleInspect}
        />
        <Icon
          icon="copy"
          className={clsx(
            "absolute rounded-md bg-indigo-500 p-1 text-white hover:opacity-60",
            "-bottom-6 -right-6 select-none transition-all duration-200 group-hover:bottom-1 group-hover:right-1"
          )}
          size={22}
          onClick={handleCopyAsSVG}
        />

        <div className="flex items-center justify-center">
          <Icon
            iconSet={iconSet}
            icon={icon.properties.name}
            title={icon.properties.name}
            size={24}
            className={
              selected
                ? "text-purple-500 dark:text-purple-500"
                : "text-neutral-600 dark:text-neutral-200"
            }
          />
        </div>
      </div>
      <input
        className="mt-[6px] mb-3 h-4 w-16 bg-transparent text-center text-xs text-neutral-400 outline-none  dark:text-neutral-500  sm:w-[70px]"
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
