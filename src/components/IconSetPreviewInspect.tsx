import { useContext, useState } from "react";
import clsx from "clsx";

import Button, { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";
import Tooltip from "src/components/Tooltip";
import SelectSize from "src/components/SelectSize";
import { IconsContext } from "src/context/IconsContext";
import {
  copyAsJSX,
  copyAsSVG,
  copyName,
  downloadAsSVG,
  sendToApp,
} from "src/utils/iconActions";

const IconSetPreviewInspect = ({ iconSet, inspectedIcon, inspect }) => {
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);
  const [size, setSize] = useState(32);

  const handleCopySVG = () => copyAsSVG(inspectedIcon, size);
  const handleCopyJSX = () => copyAsJSX(inspectedIcon, size);
  const handleDownloadSVG = () => downloadAsSVG(inspectedIcon, size);
  const handleCopyIconName = () => copyName(inspectedIcon);
  const handleSendToApp = () =>
    sendToApp([inspectedIcon], appIcons, setAppIcons);

  return (
    <>
      <div
        className={clsx(
          "min-h-20 absolute flex w-full flex-col items-center justify-between gap-3 divide-neutral-300 bg-white/[0.01] p-4  backdrop-blur-lg transition-all duration-300 dark:divide-neutral-800 sm:flex-row",
          inspectedIcon ? "bottom-20" : "bottom-0"
        )}
      >
        <Icon
          icon="close"
          size={16}
          className="absolute top-0 right-0 m-1 cursor-pointer text-neutral-800 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
          onClick={() => inspect(null)}
        />
        <div className="flex items-center text-sm text-fuchsia-500">
          <div className="mr-3 inline-flex items-center justify-center rounded-md border border-dashed border-neutral-600 p-2 ">
            <Icon
              iconSet={iconSet}
              icon={inspectedIcon?.properties.name}
              className="text-neutral-800 dark:text-neutral-200"
              size={size}
            />
          </div>
          <div className="inline-flex items-center  divide-x divide-neutral-300 dark:divide-neutral-600 ">
            <span
              className="inline-flex cursor-pointer items-center pr-3"
              onClick={handleCopyIconName}
            >
              {inspectedIcon?.properties.name}
              <Icon icon="copy" size={14} className="ml-1 cursor-pointer" />
            </span>
            <span className="pl-3">
              <SelectSize size={size} setSize={setSize} />
            </span>
          </div>
        </div>
        <div className="order-1 flex flex-col divide-x divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row">
          <div className="px-2 text-orange-400">
            <Tooltip message="Send to App">
              <Button variant={ButtonVariants.Icon} onClick={handleSendToApp}>
                <Icon icon="window-plus" size={20} />
              </Button>
            </Tooltip>
          </div>
          <div className="flex gap-x-2 px-2 text-fuchsia-500">
            <Tooltip message="Copy JSX">
              <Button variant={ButtonVariants.Icon} onClick={handleCopyJSX}>
                <Icon icon="filetype-jsx" size={20} />
                <Icon icon="copy" size={20} />
              </Button>
            </Tooltip>
            <Tooltip message="Copy SVG">
              <Button variant={ButtonVariants.Icon} onClick={handleCopySVG}>
                <Icon icon="filetype-svg" size={20} />
                <Icon icon="copy" size={20} />
              </Button>
            </Tooltip>
            <Tooltip message="Download SVG">
              <Button variant={ButtonVariants.Icon} onClick={handleDownloadSVG}>
                <Icon icon="filetype-svg" size={20} />
                <Icon icon="download" size={20} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewInspect;
