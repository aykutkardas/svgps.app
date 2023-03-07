import Link from "next/link";

import Icon from "src/components/Icon";
import { Variant } from "src/iconSets";
import { IconSet } from "src/types";

interface IconSetCardProps {
  name: string;
  slug: string;
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
  slug,
  variants,
}: IconSetCardProps) => (
  <div className="card m-[10px] h-40 w-80 select-none p-[1px]">
    <Link href={`/store/${slug}`} passHref>
      <a className="card-content  bg-gradient-to-t  dark:from-neutral-800 dark:to-neutral-900">
        <div className="bg-red relative flex h-full flex-col justify-between p-3 transition">
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
                <span className="text-neutral-400">{variants.length}</span>{" "}
                variant
                {variants.length > 1 && "s"}
              </span>
              <span className="text-xs text-neutral-500">
                <span className="text-neutral-400">{count}</span> icons
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default IconSetCard;
