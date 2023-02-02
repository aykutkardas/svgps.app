import { useRef, useContext } from "react";

import { importFiles } from "src/utils/extractFiles";
import { IconsContext } from "src/context/IconsContext";
import { DragDropContext } from "src/context/DragDropContext";
import { IconSetItem } from "src/types";

interface ImportDropWrapperProps {
  children: React.ReactNode;
  onComplete?: () => void;
  className?: string;
  icons?: IconSetItem[];
  setIcons?: (icons: IconSetItem[]) => void;
}

const ImportDropWrapper = ({
  onComplete,
  className = "",
  children,
  icons: iconsProp,
  setIcons: setIconsProp,
}: ImportDropWrapperProps) => {
  const { setIsDragging } = useContext(DragDropContext);
  let { icons, setIcons } = useContext(IconsContext);
  if (iconsProp) {
    icons = iconsProp;
    setIcons = setIconsProp;
  }

  const fileInput = useRef<null | HTMLInputElement>();

  const handleUpload = (event) =>
    importFiles(event, icons, (newIcons) => {
      setIcons(newIcons);
      onComplete?.();
    });

  // If a deleted icon is re-imported, the import will not work stable.
  // "onChange" event doesn't work at all. This key was required to fix this issue.
  const inputKey = icons.map((icon) => icon.properties.name).join("");

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    handleUpload({ target: { files: [...e.dataTransfer.files] } });

    setIsDragging(false);
  };

  const handleClick = (e) => e.preventDefault();

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <label
      className={className}
      onDragStart={onDragOver}
      onDragEnd={onDragLeave}
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      <input
        key={inputKey}
        className="hidden"
        ref={fileInput}
        type="file"
        onClick={handleClick}
        multiple={true}
        accept="application/json,image/svg+xml"
        onChange={handleUpload}
      />
      <span>{children}</span>
    </label>
  );
};

export default ImportDropWrapper;
