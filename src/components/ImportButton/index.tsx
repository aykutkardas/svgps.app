import { Fragment } from "react";
import cx from "classnames";
import { Popover, Transition } from "@headlessui/react";

import ImportWrapper from "src/components/ImportWrapper";
import Button, { ButtonVariants } from "src/components/Button";

const ImportButton = ({ className }) => (
  <>
    <Popover className={cx("relative", className)}>
      <Popover.Button
        as={Button}
        variant={ButtonVariants.Primary}
        className="w-full sm:order-1 sm:w-auto"
      >
        Import
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
        <Popover.Panel className="absolute right-0 z-10 mt-2 w-72 max-w-lg  transform">
          {({ close }) => (
            <div className="flex flex-col gap-2 rounded-lg  border border-neutral-200 bg-neutral-100 p-4 shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-center text-sm text-neutral-600 dark:text-neutral-200">
                Do you want to import SVG files to the set or import a JSON
                file?
              </p>
              <div className="mt-3 flex justify-center gap-2">
                <ImportWrapper>
                  <Button
                    className="w-full bg-fuchsia-500 text-white hover:bg-fuchsia-400"
                    onClick={() => close()}
                  >
                    Import SVG
                  </Button>
                </ImportWrapper>
                <ImportWrapper type="JSON">
                  <Button
                    className="w-full bg-sky-500 text-white hover:bg-sky-400"
                    onClick={() => close()}
                  >
                    Import JSON
                  </Button>
                </ImportWrapper>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  </>
);

export default ImportButton;
