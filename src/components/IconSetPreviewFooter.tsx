import { useContext } from "react";
import toast from "react-hot-toast";
import { klona } from "klona";
import { nanoid } from "nanoid";

import Button, { ButtonVariants } from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import { IconsContext } from "src/context/IconsContext";
import IconSetPreviewInspect from "./IconSetPreviewInspect";

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
      <IconSetPreviewInspect
        iconSet={iconSet}
        inspectedIcon={inspectedIcon}
        inspect={inspect}
        copyIconName={copyIconName}
      />
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
