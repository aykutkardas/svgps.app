import { useContext } from "react";
import cx from "clsx";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";
import { klona } from "klona";
import { nanoid } from "nanoid";

import Button, { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";
import ExportButton from "src/components/ExportButton";
import downloadSVG from "src/utils/downloadSVG";
import { convertToSVG } from "src/utils/convertToSVG";
import { IconsContext } from "src/context/IconsContext";

const IconSetPreviewFooter = ({
  icons,
  iconSet,
  inspectedIcon,
  inspect,
  copyIconName,
}) => {
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);

  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;

  const handleCopy = () => {
    copy(convertToSVG(inspectedIcon));
    toast.success("SVG Copied!");
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

  const handleSendToAppSelected = () => {
    const oldIcons = [...appIcons].map((icon) => {
      const matchedIcon = selectedIcons.find(
        ({ properties }) => properties.name === icon.properties.name
      );

      return matchedIcon || icon;
    });

    const newIcons = selectedIcons.filter(
      ({ properties }) =>
        !oldIcons.find((oldIcon) => oldIcon.properties.name === properties.name)
    );

    if (!newIcons.length) {
      return toast.error("Icons already exist!");
    }

    setAppIcons([
      ...oldIcons,
      ...newIcons.map((icon) => {
        const newIcon = klona(icon);
        newIcon.__meta = { id: nanoid() };
        return newIcon;
      }),
    ]);
    toast.success("Icons sent to App!");
  };

  return (
    <>
      <div
        className={cx(
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
          <Icon
            iconSet={iconSet}
            icon={inspectedIcon?.properties.name}
            size={33}
            className="mr-2"
          />
          <span
            className="nline-flex cursor-pointer items-baseline text-neutral-800 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300"
            onClick={() => copyIconName(inspectedIcon)}
          >
            {inspectedIcon?.properties.name}
            <Icon icon="copy" size={14} className="ml-1 cursor-pointer" />
          </span>
        </div>
        <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
          <Button
            variant={ButtonVariants.Ghost}
            className="px-1"
            onClick={handleSendToApp}
          >
            Send to App
          </Button>
          <Button
            variant={ButtonVariants.Ghost}
            className="px-1"
            onClick={handleCopy}
          >
            Copy SVG
          </Button>
          <Button
            className="px-1"
            variant={ButtonVariants.Ghost}
            onClick={() =>
              downloadSVG(
                inspectedIcon?.properties.name,
                convertToSVG(inspectedIcon)
              )
            }
          >
            Download SVG
          </Button>
        </div>
      </div>
      <div className="z-10 flex h-20 flex-col items-center justify-between gap-3 divide-neutral-300 bg-neutral-100 p-4 dark:divide-neutral-800 dark:bg-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">{`${icons.length} icons`}</div>
        <div className="order-1 flex flex-col gap-3 sm:order-2 sm:flex-row">
          {selectionCount > 0 && (
            <Button
              className="order-2 bg-purple-500 text-white"
              onClick={handleSendToAppSelected}
            >
              Send to App
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs">
                {selectionCount}
              </span>
            </Button>
          )}
          {selectionCount > 0 && (
            <ExportButton
              variant={ButtonVariants.Secondary}
              icons={selectedIcons}
              className="order-2"
            >
              Export Selected
              <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-700 text-xs">
                {selectionCount}
              </span>
            </ExportButton>
          )}
          <ExportButton
            className="order-1 sm:order-3"
            variant={ButtonVariants.Success}
            icons={icons}
          >
            Export All
          </ExportButton>
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewFooter;
