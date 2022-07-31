import { useRef, useContext } from "react";
import toast from "react-hot-toast";

import extractFiles from "src/utils/extractFiles";
import extractJSON from "src/utils/extractJSON";
import { IconsContext } from "src/context/iconsContext";

interface ImportWrapperProps {
  type?: "SVG" | "JSON";
  children: React.ReactNode;
  onComplete?: () => void;
}

const ImportWrapper = ({
  type = "SVG",
  onComplete,
  children,
}: ImportWrapperProps) => {
  const { icons, setIcons } = useContext(IconsContext);

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

  return (
    <label>
      <input
        key={inputKey}
        style={{ display: "none" }}
        ref={fileInput}
        type="file"
        multiple={isJsonType ? false : true}
        accept={isJsonType ? "application/json" : "image/svg+xml"}
        onChange={isJsonType ? handleJsonFileUpload : handleSvgFilesUpload}
      />
      <span onClick={handleClick}>{children}</span>
    </label>
  );
};

export default ImportWrapper;
