import clsx from "clsx";

import Icon from "src/components/Icon";
import { Variant } from "src/iconSets";
import { IconSet } from "src/types";

interface IconSetCardProps {
  name: string;
  creator: string;
  licence: string;
  count: number;
  iconSet: IconSet;
  variants: Variant[];
}

const IconSetCard = ({
  name,
  creator,
  licence,
  count,
  iconSet,
  variants,
}: IconSetCardProps) => (
  <div
    className={clsx(
      "relative flex h-40 flex-col justify-between overflow-hidden rounded-lg border bg-gradient-to-t p-4 shadow-lg transition hover:shadow-xl",
      "border-neutral-200/50 from-neutral-200 to-neutral-100",
      "dark:border-neutral-800/50 dark:from-neutral-800 dark:to-neutral-900 hover:dark:border-neutral-700"
    )}
  >
    <div className="align-center flex flex-wrap justify-between">
      <div>
        <h2 className="text-base font-medium text-neutral-600 dark:text-neutral-300">
          {name}
        </h2>
        <h3 className="text-xs text-neutral-500 dark:text-neutral-500">
          {creator}
        </h3>
      </div>
      <span className="mr-1 h-6 rounded-md bg-neutral-200 p-1 text-[10px] text-neutral-400 dark:bg-neutral-600/30 dark:text-neutral-500">
        {licence}
      </span>
    </div>

    <div className="mt-5 flex flex-wrap items-end justify-between">
      <div className="relative space-x-2">
        {iconSet.icons.map((icon) => (
          <Icon
            key={icon.properties.name}
            icon={icon.properties.name}
            iconSet={iconSet}
            className="mr-1 h-5 w-5 text-neutral-500"
          />
        ))}
      </div>
      <div className="flex flex-col items-end pt-2">
        <span className="text-xs text-neutral-500">
          <span className="text-neutral-400">{variants.length}</span> variant
          {variants.length > 1 && "s"}
        </span>
        <span className="text-xs text-neutral-500">
          <span className="text-neutral-400">{count}</span> icons
        </span>
      </div>
    </div>
  </div>
);

export default IconSetCard;
