import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import Icon from "src/components/Icon";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { copyAsSVG, copyName, select, sendToApp } from "src/utils/iconActions";
import { IconSetItem } from "src/types";
import { getIconSetLink } from "src/utils/getIconSetLink";
import useAuthStore from "src/stores/auth";
import useGuestCollectionStore from "src/stores/guest-collection";

interface IconPreviewProps {
  inspectedIcon: IconSetItem;
  icon: IconSetItem;
  icons: IconSetItem[];
  inspect: (icon: IconSetItem | null) => void;
  copyIconName: (icon: IconSetItem) => void;
  setIcons: (icons: IconSetItem[]) => void;
  onContextMenu: (event: unknown, icon: IconSetItem) => void;
  selectCollection?: (icons: IconSetItem[]) => void;
  isCollection?: boolean;
  isSearch?: boolean;
}

const IconPreview = ({
  icon,
  icons,
  inspectedIcon,
  onContextMenu,
  inspect,
  selectCollection,
  setIcons,
  isCollection = false,
  isSearch = false,
}: IconPreviewProps) => {
  const { isAuthenticated } = useAuthStore();
  const { guestIcons, setGuestIcons } = useGuestCollectionStore();
  const iconSetName = icon?.properties.iconSetName;
  const router = useRouter();
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

    const newIcons = icons.filter(
      (item) => item.__meta?.id && item.__meta.id !== icon.__meta?.id,
    );
    // [NOTE]: this is a hack to fix upload trigger
    setTimeout(() => setIcons(newIcons));
  };

  const handleCopyAsSVG = (e) => {
    e.stopPropagation();
    copyAsSVG(icon, 32);
  };

  const handleSelect = () => {
    if (isSearch) return;
    select(icon, icons, setIcons);
  };
  const handleCopyIconName = () => copyName(icon);
  const handleOpenIconSet = () =>
    router.push(
      "/store/" + getIconSetLink(icon.properties.iconSetName as string),
    );

  const handleSendToApp = (e) => {
    e.stopPropagation();
    if (isAuthenticated) {
      selectCollection?.([icon]);
    } else {
      sendToApp([icon], guestIcons, setGuestIcons);
    }
  };

  return (
    <div className="relative my-[6px] flex flex-col items-center justify-center">
      <div
        onContextMenu={(event) => onContextMenu(event, icon)}
        onClick={handleSelect}
        className={clsx(
          "group flex items-center justify-center overflow-hidden",
          "h-[68px] w-[68px] sm:h-[90px] sm:w-[90px]",
          "relative cursor-pointer select-none bg-transparent outline-none",
          "rounded-lg border",
          selected
            ? "border-purple-500"
            : "border-neutral-200 hover:border-purple-500/50 dark:border-neutral-700/40 hover:dark:border-purple-400/50",
        )}
      >
        {(isCollection || isSearch) && iconSetName  && (
            <Icon
              icon="arrow-up-right"
              title="Go to icon set"
              className={clsx(
                "absolute rounded-md bg-pink-500 p-1 text-white hover:opacity-60",
                "-top-6 -right-6 select-none transition-all duration-200 group-hover:top-1 group-hover:right-1",
              )}
              onClick={handleOpenIconSet}
              size={24}
            />
        )} 
        {isCollection && (
          <Icon
            icon="trash"
            title="Delete Icon"
            className={clsx(
              "absolute rounded-md bg-rose-500 p-1 text-white hover:opacity-60",
              "-top-6 -left-6 select-none transition-all duration-200 group-hover:top-1 group-hover:left-1",
            )}
            onClick={handleDelete}
            size={24}
          />
        )}
        {!isCollection && (
          <Icon
            title="Add to Collection"
            icon="squares-plus"
            className={clsx(
              "absolute rounded-md bg-violet-500 p-1 text-white hover:opacity-60",
              "-top-6 -left-6 select-none transition-all duration-200 group-hover:top-1 group-hover:left-1",
            )}
            onClick={handleSendToApp}
            size={24}
          />
        )}
        <Icon
          icon="inspect"
          title="Inspect icon"
          className={clsx(
            "absolute rounded-md bg-purple-500 p-1 text-white hover:opacity-60",
            "-bottom-6 -left-6 select-none transition-all duration-200 group-hover:bottom-1 group-hover:left-1",
          )}
          size={24}
          onClick={handleInspect}
        />
        <Icon
          icon="copy"
          title="Copy icon as SVG"
          className={clsx(
            "absolute rounded-md bg-indigo-500 p-1 text-white hover:opacity-60",
            "-bottom-6 -right-6 select-none transition-all duration-200 group-hover:bottom-1 group-hover:right-1",
          )}
          size={24}
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
      {isCollection ? (
        <input
          className="mt-[6px] mb-3 h-4 w-16 bg-transparent text-center text-xs text-neutral-400 outline-none  dark:text-neutral-500  sm:w-[70px]"
          type="text"
          readOnly={!isCollection}
          onChange={isCollection ? handleChangeName : undefined}
          value={icon.properties.name}
        />
      ) : (
        <span
          className="mt-[6px] mb-3 h-4 w-16 cursor-pointer truncate bg-transparent text-center text-xs text-neutral-400 outline-none dark:text-neutral-500  hover:dark:text-neutral-300  sm:w-[70px]"
          onClick={handleCopyIconName}
          title={icon.properties.name}
        >
          {icon.properties.name}
        </span>
      )}
    </div>
  );
};

export default IconPreview;
