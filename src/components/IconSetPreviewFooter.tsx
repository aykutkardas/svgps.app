import { useContext } from "react";
import toast from "react-hot-toast";
import { klona } from "klona";
import { nanoid } from "nanoid";

import Icon from "src/components/Icon";
import Button, { ButtonVariants } from "src/components/Button";
import ExportButton from "src/components/ExportButton";
import IconSetPreviewInspect from "src/components/IconSetPreviewInspect";
import { IconsContext } from "src/context/IconsContext";
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
  const selectedAll = selectionCount === icons.length;

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

        <div className="flex flex-col items-center divide-x divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row">
          {selectionCount > 0 && !selectedAll && (
            <div className="flex items-center gap-x-2 pr-3 text-sky-500">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-300 text-xs text-sky-500  dark:bg-neutral-900">
                {selectionCount}
              </span>
              <Button
                variant={ButtonVariants.Icon}
                className="text-orange-400 hover:text-orange-600"
                onClick={handleSendToAppSelected}
              >
                <Icon icon="window-plus" size={20} />
              </Button>
              <Button variant={ButtonVariants.Icon} onClick={downloadSelected}>
                <Icon icon="filetype-svg" size={20} />
                <Icon icon="download" size={20} />
              </Button>
              <ExportButton variant={ButtonVariants.Icon} icons={selectedIcons}>
                <Icon icon="filetype-json" size={20} />
                <Icon icon="download" size={20} />
              </ExportButton>
            </div>
          )}

          <div className="flex items-center gap-x-2 pl-3 text-neutral-600 dark:text-neutral-300">
            <Icon
              icon="package"
              size={16}
              className="text-neutral-400 dark:text-neutral-500"
            />
            <Button variant={ButtonVariants.Icon} onClick={downloadAll}>
              <Icon icon="filetype-svg" size={20} />
              <Icon icon="download" size={20} />
            </Button>
            <ExportButton variant={ButtonVariants.Icon} icons={icons}>
              <Icon icon="filetype-json" size={20} />
              <Icon icon="download" size={20} />
            </ExportButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewFooter;
