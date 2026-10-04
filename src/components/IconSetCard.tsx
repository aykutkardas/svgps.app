import Link from "next/link";

import Icon from "src/components/Icon";
import type { Variant } from "src/iconSets";
import type { IconSet } from "src/types";

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
  <div className="card group h-44 p-px select-none sm:h-48">
    <Link
      href={`/store/${slug}`}
      className="card-content p-5 transition-colors group-hover:bg-surface-raised"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-[15px] font-semibold text-fg">{name}</h2>
          <h3 className="truncate text-xs text-fg-subtle">{creator}</h3>
        </div>
        <span className="shrink-0 rounded-md border border-line bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-medium text-fg-subtle">
          {licence}
        </span>
      </div>

      <div className="mt-auto flex items-center gap-3 text-fg-muted transition-colors group-hover:text-fg">
        {iconSet.icons.slice(0, 6).map((icon) => (
          <Icon
            key={icon.properties.name}
            icon={icon.properties.name}
            iconSet={iconSet}
            className="size-[22px]"
          />
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs text-fg-subtle">
        <span>
          <span className="font-medium text-fg-muted">
            {new Intl.NumberFormat("en").format(count)}
          </span>{" "}
          icons
          {variants.length > 1 && (
            <>
              <span className="mx-1.5">·</span>
              <span className="font-medium text-fg-muted">
                {variants.length}
              </span>{" "}
              variants
            </>
          )}
        </span>
        <Icon
          icon="arrow-up-right"
          size={14}
          className="-translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:text-accent-fg group-hover:opacity-100"
        />
      </div>
    </Link>
  </div>
);

export default IconSetCard;
