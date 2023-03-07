import clsx from "clsx";
import { useRouter } from "next/router";

import Icon from "src/components/Icon";
import Tooltip from "src/components/Tooltip";
import { Variant } from "src/iconSets";

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
    <div className="inline-flex items-center gap-x-2 rounded-3xl bg-white p-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
      {variants.map((variant) => (
        <Tooltip key={variant.name} position="bottom" message={variant.name}>
          <div
            onClick={() => goToVariant(variant)}
            className={clsx(
              "inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full  hover:bg-neutral-100 dark:hover:bg-neutral-800",
              {
                "bg-neutral-200 dark:bg-neutral-700":
                  currentVariant?.name === variant.name ||
                  (!currentVariant && variant.name === defaultVariant.name),
              }
            )}
          >
            <Icon icon={variant.icon} size={12} />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default SelectVariant;
