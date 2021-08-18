import "./IconPreview.scss";
import { useState } from "react";

export default function IconPreview({ icon, icons, setIcons }) {
  const prevName = icon.name;

  const handleChangeName = (e) => {
    const newIcons = icons.map((icon) => {
      if (icon.name === prevName) {
        icon.name = e.target.value;
      }

      return icon;
    });
    setIcons(newIcons);
  };

  return (
    <div className="IconPreview">
      <input
        className="IconPreviewName"
        type="text"
        onChange={handleChangeName}
        value={icon.name}
      />
      <div
        className="IconPreviewSvg"
        dangerouslySetInnerHTML={{ __html: icon.content }}
      />
    </div>
  );
}
