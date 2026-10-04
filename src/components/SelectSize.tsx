import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

import Icon from "src/components/Icon";

interface SelectSizeProps {
  size: number;
  setSize: (size: number) => void;
}

const sizes = [16, 24, 32, 48, 64, 120];

const SelectSize = ({ size, setSize }: SelectSizeProps) => {
  const selectSize = (size, close) => {
    setSize(size);
    close();
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex h-10 w-full items-center gap-3 rounded-lg px-3 text-sm text-fg-muted transition outline-hidden hover:bg-white/[0.06] hover:text-fg">
        <span className="text-fg-subtle">Size</span>
        <span className="ml-auto font-medium whitespace-nowrap text-fg">
          {size} × {size}
        </span>
        <Icon icon="chevron-down" size={14} />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="menu-surface absolute top-11 right-0 grid min-w-0 grid-cols-3 gap-0.5">
          {({ close }) => (
            <>
              {sizes.map((sizeItem) => (
                <button
                  key={sizeItem}
                  type="button"
                  className={clsx(
                    "flex h-8 min-w-11 items-center justify-center rounded-md px-2 text-xs transition",
                    sizeItem === size
                      ? "bg-accent-soft font-medium text-accent-fg"
                      : "text-fg-muted hover:bg-white/[0.06] hover:text-fg",
                  )}
                  onClick={() => selectSize(sizeItem, close)}
                >
                  {sizeItem}
                </button>
              ))}
            </>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SelectSize;
