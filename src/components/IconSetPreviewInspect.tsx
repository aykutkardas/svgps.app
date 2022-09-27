import { useContext, useState } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";
import { klona } from "klona";
import { nanoid } from "nanoid";

import Button, { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";
import downloadSVG from "src/utils/downloadSVG";
import { convertToSVG } from "src/utils/convertToSVG";
import { convertToJSX } from "src/utils/convertToJSX";
import { IconsContext } from "src/context/IconsContext";
import SelectSize from "./SelectSize";

const IconSetPreviewInspect = ({
  iconSet,
  inspectedIcon,
  inspect,
  copyIconName,
}) => {
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);
  const [size, setSize] = useState(32);

  const handleCopySVG = () => {
    copy(convertToSVG(inspectedIcon, size));
    toast.success("SVG Copied!");
  };

  const handleCopyJSX = () => {
    copy(convertToJSX(inspectedIcon, size));
    toast.success("JSX Copied!");
  };

  const handleSendToApp = () => {
    const alreadyExist = appIcons.find(
      (newAppIcon) =>
        newAppIcon.properties.name === inspectedIcon.properties.name
    );

    if (alreadyExist) {
      return toast.error("Icon already exists in the app!");
    }

    const newIcon = klona(inspectedIcon);
    newIcon.__meta = { id: nanoid() };

    const newAppIcons = [...appIcons, newIcon];

    setAppIcons(newAppIcons);
    toast.success("Icon sent to App!");
  };

  return (
    <>
      <div
        className={clsx(
          "absolute flex h-20 w-full flex-col items-center justify-between gap-3 divide-neutral-300 bg-white/[0.01] p-4  backdrop-blur-lg transition-all duration-300 dark:divide-neutral-800 sm:flex-row",
          inspectedIcon ? "bottom-20" : "bottom-0"
        )}
      >
        <Icon
          icon="close"
          size={16}
          className="absolute top-0 right-0 m-1 cursor-pointer text-neutral-800 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300"
          onClick={() => inspect(null)}
        />
        <div className="flex items-center text-sm text-neutral-700 dark:text-neutral-200">
          <div className="mr-3 inline-flex h-14 w-14 items-center justify-center rounded-md border border-dashed border-neutral-600">
            <Icon
              iconSet={iconSet}
              icon={inspectedIcon?.properties.name}
              size={33}
            />
          </div>
          <span
            className="nline-flex cursor-pointer items-baseline text-neutral-800 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300"
            onClick={() => copyIconName(inspectedIcon)}
          >
            {inspectedIcon?.properties.name}
            <Icon icon="copy" size={14} className="ml-1 cursor-pointer" />
          </span>
        </div>
        <div className="order-1 flex flex-col divide-x divide-neutral-600 sm:order-2 sm:flex-row">
          <div className="flex gap-2 px-2">
            <SelectSize size={size} setSize={setSize} />
            <Button
              variant={ButtonVariants.Ghost}
              className="px-1"
              onClick={handleCopyJSX}
            >
              Copy JSX
            </Button>
            <Button
              variant={ButtonVariants.Ghost}
              className="px-1"
              onClick={handleCopySVG}
            >
              Copy SVG
            </Button>
            <Button
              className="px-1"
              variant={ButtonVariants.Ghost}
              onClick={() =>
                downloadSVG(
                  inspectedIcon?.properties.name,
                  convertToSVG(inspectedIcon, size)
                )
              }
            >
              Download SVG
            </Button>
          </div>
          <div className="px-2">
            <Button
              variant={ButtonVariants.Ghost}
              className="px-1"
              onClick={handleSendToApp}
            >
              Send to App
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewInspect;
