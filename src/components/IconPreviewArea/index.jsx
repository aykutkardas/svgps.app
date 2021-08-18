import "./IconPreviewArea.scss";
import IconPreview from "../IconPreview";

export default function IconPreviewArea({ icons, setIcons }) {
  return (
    <div className="IconPreviewArea">
      {icons.map((icon) => (
        <IconPreview icon={icon} icons={icons} setIcons={setIcons} />
      ))}
    </div>
  );
}
