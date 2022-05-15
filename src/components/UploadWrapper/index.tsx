import React, { useRef } from "react";
import { LabelHTMLAttributes } from "react";
import toast from "react-hot-toast";
import { IconsType } from "src/types";

import extractFiles from "src/utils/extractFiles";

interface UploadWrapperProps extends LabelHTMLAttributes<HTMLElement> {
  icons: IconsType;
  setIcons: (icons: IconsType) => void;
}
const UploadWrapper = ({ icons, setIcons, children }: UploadWrapperProps) => {
  const fileInput = useRef<null | HTMLInputElement>();

  const handleFileInput = async (event) => {
    const uploadedIcons = await extractFiles(event);

    if (!uploadedIcons.length) return;

    const oldIcons = [...icons].map((icon) => {
      const matchedIcon = uploadedIcons.find(({ name }) => name === icon.name);

      return matchedIcon || icon;
    });

    const newIcons = uploadedIcons.filter(
      ({ name }) => !oldIcons.find((oldIcon) => oldIcon.name === name)
    );

    if (newIcons.length) {
      toast.success("Upload successful!");
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

export default UploadWrapper;
