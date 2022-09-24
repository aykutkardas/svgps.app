import { useContext, useState } from "react";
import cx from "clsx";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";
import { klona } from "klona";

import Button, { ButtonVariants } from "src/components/Button";
import Icon from "src/components/Icon";
import IconPreview from "src/components/IconPreview";
import ExportButton from "src/components/ExportButton";
import { DragDropContext } from "src/context/DragDropContext";
import { IconSetItem } from "src/types";
import { convertToSVG } from "src/utils/convertToSVG";
import downloadSVG from "src/utils/downloadSVG";
import { IconsContext } from "src/context/IconsContext";
import SelectVariant from "./SelectVariant";

const Variants = {
  outline: "Outline",
};

const IconSetPreview = ({ iconSet, variant: initialVariant, data }) => {
  const { icons: appIcons, setIcons: setAppIcons } = useContext(IconsContext);

  const [inspectedIcon, setInspectedIcon] = useState<IconSetItem>(null);
  const [icons, setIcons] = useState(iconSet.icons);
  const { isDragging } = useContext(DragDropContext);
  const [search, setSearch] = useState("");
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);
  const selectionCount = selectedIcons.length;
  const [variant, setVariant] = useState(Variants[initialVariant]);

  const filteredIcons = icons.filter((icon) =>
    icon.properties?.name.toLowerCase().includes(search.toLowerCase())
  );

  const noIcons = filteredIcons.length === 0;

  const handleCopy = () => {
    copy(convertToSVG(inspectedIcon));
    toast.success("SVG Copied!");
  };

  const handleSearch = ({ target }) => setSearch(target.value);

  const handleSendToApp = () => {
    const alreadyExist = appIcons.find(
      (newAppIcon) =>
        newAppIcon.properties.name === inspectedIcon.properties.name
    );

    if (alreadyExist) {
      return toast.error("Icon already exists in the app!");
    }

    const newIcon = klona(inspectedIcon);
    delete newIcon.__meta?._selected;

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
        delete newIcon.__meta?._selected;
        return newIcon;
      }),
    ]);
    toast.success("Icons sent to App!");
  };

  const handleCopyName = (icon) => {
    const iconName = icon.properties.name;
    copy(iconName);
    toast.success(`"${iconName}" copied!`);
  };

  return (
    <div
      className={cx(
        "relative flex h-[600px] flex-col divide-y overflow-hidden rounded-lg border shadow-xl dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-800",
        "divide-neutral-200 border-neutral-200 bg-neutral-100"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          {data.variants && (
            <SelectVariant
              className=""
              variants={data.variants}
              iconSetSlug={data.slug}
              variant={variant}
              setVariant={setVariant}
            />
          )}
          <label
            className={cx(
              "inline-flex w-64 items-center bg-neutral-200 bg-transparent py-1 text-neutral-400",
              { "cursor-not-allowed opacity-40": noIcons && !search }
            )}
          >
            <Icon icon="search" size={16} className="text-current" />
            <input
              className="ml-2 h-6 w-full rounded-sm border-none bg-transparent text-sm text-current outline-none disabled:cursor-not-allowed"
              onKeyUp={handleSearch}
              placeholder="Search..."
              disabled={noIcons && !search}
            />
          </label>
        </div>
        <div className="flex-col text-right">
          <h4 className="text-sm text-neutral-800 dark:text-neutral-300">
            <a
              href={data.licenceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-1 rounded-md bg-neutral-200 p-1 text-[10px] text-neutral-400 hover:text-neutral-500 dark:bg-neutral-600/30 dark:text-neutral-500 dark:hover:text-neutral-400"
            >
              {data.licence}
            </a>
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-500 dark:hover:text-neutral-200"
            >
              {data.name}
            </a>
          </h4>
          <span className="mt-0 text-xs text-neutral-700 dark:text-neutral-500">
            {data.creator}
          </span>
        </div>
      </div>
      <div
        className={cx(
          "relative flex-1 snap-y grid-cols-4 gap-1 overflow-y-auto overflow-x-hidden py-8 px-0 pb-20 transition",
          noIcons
            ? "flex items-center justify-center"
            : "grid sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-14"
        )}
      >
        {search && noIcons && !isDragging && (
          <p className="w-48 p-4 text-sm text-neutral-500">No icons found.</p>
        )}
        {filteredIcons.map((icon) => (
          <IconPreview
            icons={icons}
            setIcons={setIcons}
            copyIconName={handleCopyName}
            inspectedIcon={inspectedIcon}
            inspect={setInspectedIcon}
            key={icon.properties.name}
            icon={icon}
            disableRemove
          />
        ))}
      </div>

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
          onClick={() => setInspectedIcon(null)}
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
            onClick={() => handleCopyName(inspectedIcon)}
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
    </div>
  );
};

export default IconSetPreview;
