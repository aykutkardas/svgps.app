import { useRef, useContext } from "react";
import toast from "react-hot-toast";

import extractFiles from "src/utils/extractFiles";
import { IconsContext } from "src/context/IconsContext";
import { DragDropContext } from "src/context/DragDropContext";

interface ImportDropWrapperProps {
  children: React.ReactNode;
  onComplete?: () => void;
  className?: string;
}

const ImportDropWrapper = ({
  onComplete,
  className = "",
  children,
}: ImportDropWrapperProps) => {
  const { icons, setIcons } = useContext(IconsContext);
  const { setIsDragging } = useContext(DragDropContext);

  const fileInput = useRef<null | HTMLInputElement>();

  const handleSvgFilesUpload = async (event) => {
    const importedIcons = await extractFiles(event);

    if (!importedIcons.length) return;

    const oldIcons = [...icons].map((icon) => {
      const matchedIcon = importedIcons.find(
        ({ properties }) => properties.name === icon.properties.name
      );

      return matchedIcon || icon;
    });

    const newIcons = importedIcons.filter(
      ({ properties }) =>
        !oldIcons.find((oldIcon) => oldIcon.properties.name === properties.name)
    );

    if (newIcons.length) {
      toast.success("Import successful!");
    }

    setIcons([...oldIcons, ...newIcons]);
    onComplete?.();
  };

  // If a deleted icon is re-imported, the import will not work stable.
  // "onChange" event doesn't work at all. This key was required to fix this issue.
  const inputKey = JSON.stringify(icons);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = [...e.dataTransfer.files].filter(
      (file: File) => file.type === "image/svg+xml"
    );
    handleSvgFilesUpload({ target: { files } });

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
        accept="image/svg+xml"
        onChange={handleSvgFilesUpload}
      />
      <span>{children}</span>
    </label>
  );
};

export default ImportDropWrapper;
