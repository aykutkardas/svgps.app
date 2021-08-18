import "./IconPreviewArea.scss";
import IconPreview from "../IconPreview";

export default function IconPreviewArea({ icons }) {
  return (
    <div className="IconPreviewArea">
      {icons.map((icon) => (
        <IconPreview icon={icon} />
      ))}
    </div>
  );
}
