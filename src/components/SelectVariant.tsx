import clsx from "clsx";
import { useRouter } from "next/navigation";

import Icon from "src/components/Icon";
import Tooltip from "src/components/Tooltip";
import type { Variant } from "src/iconSets";

interface SelectVariantProps {
  variants: Variant[];
  variant: Variant;
  setVariant: (variant: Variant) => void;
  iconSetSlug: string;
}

const SelectVariant = ({
  variants,
  variant: currentVariant,
  setVariant,
  iconSetSlug,
}: SelectVariantProps) => {
  const router = useRouter();

  const [defaultVariant] = variants;

  const goToVariant = (variant) => {
    const slug = variant.name === defaultVariant.name ? "" : `/${variant.slug}`;

    router.push(`/store/${iconSetSlug}${slug}`);
    setVariant(variant);
  };

  return (
    <div
      role="radiogroup"
      aria-label="Variant"
      className="inline-flex shrink-0 items-center gap-0.5 rounded-lg border border-line bg-white/[0.03] p-0.5"
    >
      {variants.map((variant) => {
        const active =
          currentVariant?.name === variant.name ||
          (!currentVariant && variant.name === defaultVariant.name);
        return (
          <Tooltip key={variant.name} position="bottom" message={variant.name}>
            <button
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={variant.name}
              onClick={() => goToVariant(variant)}
              className={clsx(
                "inline-flex size-7 items-center justify-center rounded-md transition",
                active
                  ? "bg-white/[0.1] text-fg"
                  : "text-fg-subtle hover:bg-white/[0.05] hover:text-fg-muted",
              )}
            >
              <Icon icon={variant.icon} size={13} />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
};

export default SelectVariant;
