import { useContext } from "react";
import toast from "react-hot-toast";
import { klona } from "klona";
import { nanoid } from "nanoid";

import Button, { ButtonVariants } from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import { IconsContext } from "src/context/IconsContext";
import IconSetPreviewInspect from "./IconSetPreviewInspect";
import { convertToSVG } from "src/utils/convertToSVG";
import { downloadSVGs } from "src/utils/downloadSVGs";

const IconSetPreviewFooter = ({
  icons,
  iconSet,
  iconSetData,
  inspectedIcon,
  inspect,
  copyIconName,
  setIcons,
}) => {
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);

  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;

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

  const handleDeselect = () => {
    const deselectedIcons = icons.map((icon) => {
      icon.__meta = { _selected: false };
      return icon;
    });

    setIcons(deselectedIcons);
  };

  const downloadAll = () => {
    const _icons = icons.map((icon) => ({
      name: icon.properties.name,
      svg: convertToSVG(icon),
    }));

    downloadSVGs(_icons, iconSetData.slug);
  };

  const downloadSelected = () => {
    const _icons = selectedIcons.map((icon) => ({
      name: icon.properties.name,
      svg: convertToSVG(icon),
    }));

    downloadSVGs(_icons, `${iconSetData.slug}-selected`);
  };

  return (
    <>
      <IconSetPreviewInspect
        iconSet={iconSet}
        inspectedIcon={inspectedIcon}
        inspect={inspect}
        copyIconName={copyIconName}
      />
      <div className="z-10 flex h-20 flex-col items-center justify-between gap-3 divide-neutral-300 bg-neutral-100 p-4 dark:bg-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">
          {`${icons.length} icons`}
        </div>
        <div className="order-1 flex flex-col gap-3 sm:flex-row sm:divide-x sm:divide-neutral-300 dark:sm:divide-neutral-700">
          {selectionCount > 0 && (
            <div className="flex flex-col">
              <span className="mx-auto mb-2 text-xs text-neutral-500">
                Selected
              </span>
              <div className="flex gap-3">
                <Button
                  className="order-2"
                  variant={ButtonVariants.Ghost}
                  onClick={handleDeselect}
                >
                  Deselect All
                </Button>
                <Button
                  className="order-2 bg-purple-500 text-white"
                  onClick={handleSendToAppSelected}
                >
                  Send to App
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs">
                    {selectionCount}
                  </span>
                </Button>
                <ExportButton
                  variant={ButtonVariants.Secondary}
                  icons={selectedIcons}
                  className="order-2"
                >
                  Convert JSON
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-700 text-xs">
                    {selectionCount}
                  </span>
                </ExportButton>
                <Button
                  className="order-1 sm:order-3"
                  variant={ButtonVariants.Success}
                  onClick={downloadSelected}
                >
                  Download SVG
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-xs">
                    {selectionCount}
                  </span>
                </Button>
              </div>
            </div>
          )}

          <div className="flex flex-col px-3">
            {selectionCount > 0 && (
              <span className="mx-auto mb-2 text-xs text-neutral-500">All</span>
            )}
            <div className="flex gap-3">
              <ExportButton
                className="order-1 sm:order-3"
                variant={ButtonVariants.Secondary}
                icons={icons}
              >
                Convert JSON
              </ExportButton>
              <Button
                className="order-1 sm:order-3"
                variant={ButtonVariants.Success}
                onClick={downloadAll}
              >
                Download SVG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewFooter;
