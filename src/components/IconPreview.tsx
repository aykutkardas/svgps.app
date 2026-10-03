import { useContext } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import Icon from "src/components/Icon";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { copyAsSVG, copyName, select, sendToApp } from "src/utils/iconActions";
import { IconSetItem } from "src/types";
import { getIconSetLink } from "src/utils/getIconSetLink";
import useGuestCollectionStore from "src/stores/guest-collection";

const cornerPositions = {
  "top-left": "-top-8 -left-8 group-hover:top-1.5 group-hover:left-1.5",
  "top-right": "-top-8 -right-8 group-hover:top-1.5 group-hover:right-1.5",
  "bottom-left":
    "-bottom-8 -left-8 group-hover:bottom-1.5 group-hover:left-1.5",
  "bottom-right":
    "-bottom-8 -right-8 group-hover:bottom-1.5 group-hover:right-1.5",
};

const CornerAction = ({
  icon,
  title,
  corner,
  tone,
  onClick,
}: {
  icon: string;
  title: string;
  corner: keyof typeof cornerPositions;
  tone: string;
  onClick: (event: React.MouseEvent) => void;
}) => (
  <button
    type="button"
    title={title}
    aria-label={title}
    onClick={onClick}
    className={clsx(
      "absolute z-10 flex size-6 items-center justify-center rounded-md",
      "border border-line-strong bg-surface-raised/90 text-fg-muted shadow-sm backdrop-blur",
      "transition-all duration-200 select-none hover:text-white",
      cornerPositions[corner],
      tone,
    )}
  >
    <Icon icon={icon} size={14} />
  </button>
);

interface IconPreviewProps {
  inspectedIcon: IconSetItem;
  icon: IconSetItem;
  icons: IconSetItem[];
  inspect: (icon: IconSetItem | null) => void;
  copyIconName: (icon: IconSetItem) => void;
  setIcons: (icons: IconSetItem[]) => void;
  onContextMenu: (event: unknown, icon: IconSetItem) => void;
  isCollection?: boolean;
  isSearch?: boolean;
}

const IconPreview = ({
  icon,
  icons,
  inspectedIcon,
  onContextMenu,
  inspect,
  setIcons,
  isCollection = false,
  isSearch = false,
}: IconPreviewProps) => {
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
    sendToApp([icon], guestIcons, setGuestIcons);
  };

  return (
    <div className="relative flex min-w-0 flex-col items-center">
      <div
        onContextMenu={(event) => onContextMenu(event, icon)}
        onClick={handleSelect}
        className={clsx(
          "group relative flex aspect-square w-full items-center justify-center overflow-hidden",
          "cursor-pointer rounded-xl border bg-white/[0.02] outline-hidden transition duration-200 select-none",
          selected
            ? "border-accent/70 bg-accent-soft shadow-[inset_0_0_0_1px_rgb(139_92_246/0.4)]"
            : "border-line hover:border-line-strong hover:bg-white/[0.045]",
        )}
      >
        {(isCollection || isSearch) && iconSetName && (
          <CornerAction
            icon="arrow-up-right"
            title="Go to icon set"
            corner="top-right"
            tone="hover:border-pink-400/60 hover:bg-pink-500"
            onClick={(event) => {
              event.stopPropagation();
              handleOpenIconSet();
            }}
          />
        )}
        {isCollection && (
          <CornerAction
            icon="trash"
            title="Delete Icon"
            corner="top-left"
            tone="hover:border-rose-400/60 hover:bg-rose-500"
            onClick={handleDelete}
          />
        )}
        {!isCollection && (
          <CornerAction
            icon="squares-plus"
            title="Add to Collection"
            corner="top-left"
            tone="hover:border-violet-400/60 hover:bg-violet-500"
            onClick={handleSendToApp}
          />
        )}
        <CornerAction
          icon="inspect"
          title="Inspect icon"
          corner="bottom-left"
          tone="hover:border-purple-400/60 hover:bg-purple-500"
          onClick={handleInspect}
        />
        <CornerAction
          icon="copy"
          title="Copy icon as SVG"
          corner="bottom-right"
          tone="hover:border-indigo-400/60 hover:bg-indigo-500"
          onClick={handleCopyAsSVG}
        />

        <Icon
          iconSet={iconSet}
          icon={icon.properties.name}
          title={icon.properties.name}
          size={24}
          className={clsx(
            "transition duration-200 group-hover:scale-110",
            selected ? "text-accent-fg" : "text-fg/85 group-hover:text-fg",
          )}
        />
      </div>
      {isCollection ? (
        <input
          className="mt-1.5 mb-2 h-5 w-full rounded-md bg-transparent px-1 text-center text-[11px] text-fg-subtle outline-hidden transition hover:bg-white/[0.04] focus:bg-white/[0.06] focus:text-fg"
          type="text"
          aria-label="Icon name"
          readOnly={!isCollection}
          onChange={isCollection ? handleChangeName : undefined}
          value={icon.properties.name}
        />
      ) : (
        <span
          className="mt-1.5 mb-2 h-5 w-full cursor-pointer truncate px-1 text-center text-[11px] leading-5 text-fg-subtle transition hover:text-fg-muted"
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
