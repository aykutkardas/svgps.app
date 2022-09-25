import ImportButton from "src/components/ImportButton";
import IconSetSearch from "./IconSetSearch";

const IconsAppHeader = ({ noIcons, search, setSearch }) => (
  <div className="flex items-center justify-between p-4">
    <ImportButton />
    <IconSetSearch setSearch={setSearch} disabled={noIcons && !search} />
  </div>
);

export default IconsAppHeader;
