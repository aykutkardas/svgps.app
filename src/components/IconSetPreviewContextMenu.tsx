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
      label: alreadyInspected ? "Uninspect" : "Inspect",
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
      role="menu"
      className={clsx(
        "menu-surface absolute animate-fade-in [animation-duration:120ms]",
      )}
      style={{
        top: contextMenu.y,
        left: contextMenu.x,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          role="menuitem"
          onClick={item.onClick}
          className="menu-item"
        >
          <Icon icon={item.icon} size={15} />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default IconSetPreviewContextMenu;
