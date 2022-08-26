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
        <Popover.Button>
          <Button
            onClick={toggleDialog}
            variant={ButtonVariants.Primary}
            className="w-64"
          >
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
          <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-">
            <div className="flex flex-col gap-2 p-4 bg-neutral-700 rounded-lg">
              <p className="text-sm text-neutral-200">
                Do you want to import SVG files to the set or import a JSON
                file?
              </p>
              <ImportWrapper onComplete={toggleDialog}>
                <Button className="w-full text-white bg-purple-500 hover:bg-purple-400">
                  Import SVG Files
                </Button>
              </ImportWrapper>
              <ImportWrapper onComplete={toggleDialog} type="JSON">
                <Button className="w-full text-white bg-sky-500 hover:bg-sky-400">
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
