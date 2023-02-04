import clsx from "clsx";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

import Icon from "src/components/Icon";
import { convertToSVG } from "src/utils/convertToSVG";
import { convertToJSX } from "src/utils/convertToJSX";

const IconSetPreviewContextMenu = ({
  contextMenu,
  setContextMenu,
  inspectedIcon,
  setInspectedIcon,
}) => {
  const alreadyInspected =
    contextMenu.icon.properties.name === inspectedIcon?.properties.name;

  const handleCopyName = () => {
    const iconName = contextMenu.icon.properties.name;
    copy(iconName);
    toast.success(`"${iconName}" copied!`);
  };

  const inspect = () => {
    setInspectedIcon(alreadyInspected ? null : contextMenu.icon);
  };

  const close = () => {
    setContextMenu(null);
  };

  const handleCopySVG = () => {
    copy(convertToSVG(contextMenu.icon));
    toast.success("SVG Copied!");
  };

  const handleCopyJSX = () => {
    copy(convertToJSX(contextMenu.icon));
    toast.success("JSX Copied!");
  };

  const items = [
    {
      label: alreadyInspected ? "Unispect" : "Inspect",
      onClick: inspect,
      icon: "inspect",
    },
    {
      label: "Copy SVG",
      onClick: handleCopySVG,
      icon: "copy",
    },
    {
      label: "Copy JSX",
      onClick: handleCopyJSX,
      icon: "copy",
    },
    {
      label: "Copy Name",
      onClick: handleCopyName,
      icon: "copy",
    },
  ];

  return (
    <div
      onClick={close}
      className={clsx(
        "absolute z-50 select-none divide-y divide-neutral-300 overflow-hidden text-center  text-xs leading-none text-neutral-800 dark:divide-neutral-600/60",
        "rounded-md bg-neutral-100 shadow-lg dark:bg-neutral-700 dark:text-neutral-300"
      )}
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          onClick={item.onClick}
          className="flex h-8 w-28 cursor-pointer items-center py-2 px-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
        >
          <Icon icon={item.icon} size={16} className="mr-2" />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default IconSetPreviewContextMenu;
