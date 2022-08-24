import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ImportWrapper from "src/components/ImportWrapper";
import Button, { ButtonVariants } from "src/components/Button";
import Dialog from "src/components/Dialog";

const ImportButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDialog = () => {
    navigate("/icons");
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <>
      <Button
        onClick={toggleDialog}
        className="bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg "
      >
        <span>Import</span>
      </Button>

      <Dialog
        hideButtons={true}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        <div className="flex flex-col items-center">
          <span>
            Do you want to import SVG files to the set or import a JSON file?
          </span>
          <div className="flex gap-2 w-full justify-end mt-8">
            <Button variant={ButtonVariants.Ghost} onClick={toggleDialog}>
              Close
            </Button>
            <ImportWrapper onComplete={toggleDialog}>
              <Button>Import SVG Files</Button>
            </ImportWrapper>
            <ImportWrapper onComplete={toggleDialog} type="JSON">
              <Button>Import JSON</Button>
            </ImportWrapper>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ImportButton;
