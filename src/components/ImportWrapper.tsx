import { useRef, useContext } from "react";
import toast from "react-hot-toast";
import cx from "classnames";

import extractFiles from "src/utils/extractFiles";
import extractJSON from "src/utils/extractJSON";
import { IconsContext } from "src/context/IconsContext";
import { DragDropContext } from "src/context/DragDropContext";

interface ImportWrapperProps {
  type?: "SVG" | "JSON";
  children: React.ReactNode;
  onComplete?: () => void;
  className?: string;
}

const ImportWrapper = ({
  type = "SVG",
  onComplete,
  className = "",
  children,
}: ImportWrapperProps) => {
  const { icons, setIcons } = useContext(IconsContext);
  const { isDragging, setIsDragging } = useContext(DragDropContext);

  const fileInput = useRef<null | HTMLInputElement>();

  const handleSvgFilesUpload = async (files) => {
    const importedIcons = await extractFiles(files);

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

  const handleJsonFileUpload = async (event) => {
    const importedIcons = await extractJSON(event);

    if (!importedIcons.length) return;

    setIcons(importedIcons);
    onComplete?.();
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  const isJsonType = type === "JSON";

  // If a deleted icon is re-imported, the import will not work stable.
  // "onChange" event doesn't work at all. This key was required to fix this issue.
  const inputKey = JSON.stringify(icons);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = [...e.dataTransfer.files].filter(
      (file: File) => file.type === "image/svg+xml"
    );
    handleSvgFilesUpload(files);

    setIsDragging(false);
  };

  return (
    <label className={className}>
      <input
        key={inputKey}
        className={cx("absolute left-0 top-0 z-20 overflow-hidden opacity-0", {
          "h-full w-full": isDragging,
          "h-0.5 w-0.5": !isDragging,
        })}
        ref={fileInput}
        type="file"
        multiple={isJsonType ? false : true}
        accept={isJsonType ? "application/json" : "image/svg+xml"}
        onChange={(e) =>
          isJsonType
            ? handleJsonFileUpload(e)
            : handleSvgFilesUpload(e.target.files)
        }
        onDragStart={(e) => {
          e.preventDefault();
        }}
        onDragEnd={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
      />
      <span onClick={handleClick}>{children}</span>
    </label>
  );
};

export default ImportWrapper;
