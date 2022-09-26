import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import Icon from "src/components/Icon";
import Button, { ButtonVariants } from "src/components/Button";
import { useRouter } from "next/router";

interface SelectVariantProps {
  variants: string[];
  variant: string;
  setVariant: Function;
  iconSetSlug: string;
}

const SelectVariant = ({
  variants,
  variant,
  setVariant,
  iconSetSlug,
}: SelectVariantProps) => {
  const router = useRouter();

  const goToVariant = (variant, close) => {
    router.push(
      `/store/${iconSetSlug}${variant ? `/${variant.toLowerCase()}` : ""}`
    );
    setVariant(variant);
    close();
  };

  return (
    <Popover className="relative">
      <Popover.Button
        as={Button}
        variant={ButtonVariants.Ghost}
        className="w-full px-0 sm:order-1 sm:w-auto"
      >
        {variant || "Variant"}
        <Icon icon="chevron-down" size={16} className="ml-1"></Icon>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute top-8 -left-1 z-10 mt-2 w-44 max-w-lg  transform">
          {({ close }) => (
            <div className="flex flex-col divide-y divide-neutral-300 rounded-lg  border border-neutral-200 bg-neutral-100 shadow-xl  dark:divide-neutral-600 dark:border-neutral-700 dark:bg-neutral-800">
              <div
                role="button"
                className="flex h-10 items-center bg-transparent p-2 text-sm text-neutral-600 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                onClick={() => goToVariant(null, close)}
              >
                Default
              </div>
              {variants.map((variant) => (
                <div
                  key={variant}
                  role="button"
                  className="flex h-10 items-center bg-transparent p-2 text-sm text-neutral-600 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  onClick={() => goToVariant(variant, close)}
                >
                  {variant}
                </div>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SelectVariant;
