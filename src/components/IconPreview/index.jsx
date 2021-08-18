import "./IconPreview.scss";
import { useState } from "react";

export default function IconBox({ icon }) {
  const [name, setName] = useState(icon.name);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="IconPreview">
      <input
        className="IconPreviewName"
        type="text"
        onChange={handleChangeName}
        value={name}
      />
      <div
        className="IconPreviewSvg"
        dangerouslySetInnerHTML={{ __html: icon.content }}
      ></div>
    </div>
  );
}
