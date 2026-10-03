import SupportActions from "./SupportActions";

const IconSetPreviewSearchHeader = () => (
  <div className="flex items-center justify-between px-4 py-2.5 sm:px-5">
    <span className="text-xs font-medium tracking-wide text-fg-subtle uppercase">
      Search results
    </span>
    <SupportActions isSearch />
  </div>
);

export default IconSetPreviewSearchHeader;
