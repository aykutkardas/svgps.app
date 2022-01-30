import IconPreview from "../IconPreview";

export default function IconPreviewArea({ icons, setIcons }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,theme(space.32))] gap-6 justify-center">
      {icons.map((icon, index) => (
        <div key={index}>
          <IconPreview icon={icon} icons={icons} setIcons={setIcons} />
        </div>
      ))}
    </div>
  );
}
