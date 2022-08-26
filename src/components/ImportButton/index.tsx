import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import ImportWrapper from "src/components/ImportWrapper";
import Button, { ButtonVariants } from "src/components/Button";
import { Popover, Transition } from "@headlessui/react";

const ImportButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDialog = () => {
    navigate("/icons");
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="focus:outline-none focus:ring-0">
          <Button onClick={toggleDialog} variant={ButtonVariants.Primary}>
            Import
          </Button>
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
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-lg -translate-x-1/2 transform px-4">
            <div className="flex flex-col gap-2 rounded-lg bg-neutral-700 p-4">
              <p className="text-sm text-neutral-200">
                Do you want to import SVG files to the set or import a JSON
                file?
              </p>
              <ImportWrapper onComplete={toggleDialog}>
                <Button className="w-full bg-purple-500 text-white hover:bg-purple-400">
                  Import SVG Files
                </Button>
              </ImportWrapper>
              <ImportWrapper onComplete={toggleDialog} type="JSON">
                <Button className="w-full bg-sky-500 text-white hover:bg-sky-400">
                  Import JSON
                </Button>
              </ImportWrapper>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default ImportButton;
