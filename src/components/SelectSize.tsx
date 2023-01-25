import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

import Icon from "src/components/Icon";
import Button from "src/components/Button";

interface SelectSizeProps {
  size: number;
  setSize: Function;
}

const sizes = [16, 24, 32, 48, 64, 120];

const SelectSize = ({ size, setSize }: SelectSizeProps) => {
  const selectSize = (size, close) => {
    setSize(size);
    close();
  };

  return (
    <Popover className="relative">
      <Popover.Button
        as={Button}
        variant="ringlessGhost"
        className="w-full px-0 !outline-none !ring-0 sm:w-auto"
      >
        Size:{" "}
        <span className="ml-2 whitespace-nowrap text-neutral-900 dark:text-neutral-100">
          {size} x {size}
        </span>
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
        <Popover.Panel className="absolute top-6 -right-1 z-10 mt-2 w-10 max-w-lg  transform">
          {({ close }) => (
            <div className="flex flex-col divide-y divide-neutral-300 rounded-lg border border-neutral-200 bg-neutral-100 shadow-xl  dark:divide-neutral-600 dark:border-neutral-700 dark:bg-neutral-800">
              {sizes.map((sizeItem) => (
                <div
                  key={sizeItem}
                  role="button"
                  className="flex h-8 items-center justify-center bg-transparent p-1 text-sm text-neutral-600 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  onClick={() => selectSize(sizeItem, close)}
                >
                  {sizeItem}
                </div>
              ))}
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default SelectSize;
