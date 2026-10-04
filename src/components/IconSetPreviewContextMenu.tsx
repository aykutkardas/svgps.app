import clsx from "clsx";
import Icon from "src/components/Icon";
import { copyAsJSX, copyAsSVG, copyName } from "src/utils/iconActions";

const IconSetPreviewContextMenu = ({
  contextMenu,
  setContextMenu,
  inspectedIcon,
  setInspectedIcon,
}) => {
  const alreadyInspected =
    contextMenu.icon.properties.name === inspectedIcon?.properties.name;

  const handleCopyName = () => copyName(contextMenu.icon);

  const inspect = () => {
    setInspectedIcon(alreadyInspected ? null : contextMenu.icon);
  };

  const close = () => {
    setContextMenu(null);
  };

  // 32px matches the default size these used before.
  const handleCopySVG = () => copyAsSVG(contextMenu.icon, 32);
  const handleCopyJSX = () => copyAsJSX(contextMenu.icon, 32);

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
