import { useRef } from "react";
import { nanoid } from "nanoid";

import extractFiles from "src/utils/extractFiles";

const UploadWrapper = ({ icons, setIcons, children }) => {
  const fileInput = useRef();

  const handleFileInput = async (event) => {
    const selectedIcons = await extractFiles(event);

    if (selectedIcons.length) {
      const oldIcons = [...icons].map((icon) => {
        const matchedIcon = selectedIcons.find(
          (selectedIcon) => selectedIcon.name === icon.name
        );
        if (matchedIcon) {
          return matchedIcon;
        }
        return icon;
      });

      const newIcons = selectedIcons.filter(
        (selectedIcon) =>
          !oldIcons.find((oldIcon) => oldIcon.name === selectedIcon.name)
      );

      setIcons([...oldIcons, ...newIcons]);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  const id = "file-input-" + nanoid();

  return (
    <label htmlFor={id}>
      <input
        style={{ display: "none" }}
        ref={fileInput}
        id={id}
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
