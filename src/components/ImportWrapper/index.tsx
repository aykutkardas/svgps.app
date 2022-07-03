import { useRef, LabelHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { IconSetItem } from "src/types";
import extractFiles from "src/utils/extractFiles";

interface ImportWrapperProps extends LabelHTMLAttributes<HTMLElement> {
  icons: IconSetItem[];
  setIcons: (icons: IconSetItem[]) => void;
}

const ImportWrapper = ({ icons, setIcons, children }: ImportWrapperProps) => {
  const fileInput = useRef<null | HTMLInputElement>();
  const navigate = useNavigate();

  const handleFileInput = async (event) => {
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

      navigate("/icons");
    }

    setIcons([...oldIcons, ...newIcons]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

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
        multiple
        accept="image/svg+xml"
        onChange={handleFileInput}
      />
      <span onClick={handleClick}>{children}</span>
    </label>
  );
};

export default ImportWrapper;
