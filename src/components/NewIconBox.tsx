import clsx from "clsx";

import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";
import { IconSetItem } from "src/types";

const NewIconBox = ({
  icons,
  setIcons,
}: {
  icons: IconSetItem[];
  setIcons: (icons: IconSetItem[]) => void;
}) => (
  <ImportWrapper
    icons={icons}
    setIcons={setIcons}
    className="block [&>span]:flex [&>span]:flex-col [&>span]:items-center"
  >
    <div
      title="Import SVG or JSON files"
      className={clsx(
        "flex aspect-square w-full flex-col items-center justify-center rounded-xl",
        "border border-dashed border-line-strong text-fg-subtle transition",
        "cursor-pointer hover:border-accent/60 hover:bg-accent-soft hover:text-accent-fg",
      )}
    >
      <Icon icon="close" size={20} className="rotate-45" />
    </div>
    <span className="mt-1.5 mb-2 h-5 text-[11px] leading-5 text-fg-subtle">
      Import
    </span>
  </ImportWrapper>
);

export default NewIconBox;
