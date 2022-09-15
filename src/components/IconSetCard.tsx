import cx from "clsx";
import { IconSet } from "src/types";
import Icon from "./Icon";

interface IconSetCardProps {
  name: string;
  creator: string;
  licence: string;
  count: number;
  iconSet: IconSet;
}

const IconSetCard = ({
  name,
  creator,
  licence,
  count,
  iconSet,
}: IconSetCardProps) => (
  <div
    className={cx(
      "relative flex h-40 flex-col justify-between overflow-hidden rounded-lg border bg-gradient-to-t p-5 shadow-lg transition hover:shadow-xl",
      "border-neutral-200/50 from-neutral-200 to-neutral-100",
      "dark:border-neutral-800/50 dark:from-neutral-800 dark:to-neutral-900 hover:dark:border-neutral-700"
    )}
  >
    <div className="align-center flex justify-between">
      <div>
        <h2 className="text-lg text-neutral-600 dark:text-neutral-300">
          {name}
        </h2>
        <h3 className="pt-1 text-sm text-neutral-500 dark:text-neutral-500">
          {creator}
        </h3>
      </div>
      <span className="text-xs text-neutral-600 dark:text-neutral-500">
        {licence}
      </span>
    </div>

    <div className="mt-5 flex justify-between">
      <div className="relative space-x-2">
        {iconSet.icons.map((icon) => (
          <Icon
            icon={icon?.properties?.name}
            iconSet={iconSet}
            className="mr-1 h-5 w-5 text-neutral-500"
          />
        ))}
      </div>
      <span className="pt-2 text-xs text-neutral-500">{count} icons</span>
    </div>
  </div>
);

export default IconSetCard;
