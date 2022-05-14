import { useRef } from "react";

import extractFiles from "src/utils/extractFiles";

const UploadWrapper = ({ icons, setIcons, children }) => {
  const fileInput = useRef();

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

    setIcons([...oldIcons, ...newIcons]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fileInput?.current?.click();
  };

  return (
    <label>
      <input
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
