import cx from "clsx";

import Icon from "src/components/Icon";
import ImportButton from "src/components/ImportButton";

const IconsAppHeader = ({ noIcons, search, setSearch }) => {
  const handleSearch = ({ target }) => setSearch(target.value);

  return (
    <div className="flex items-center justify-between p-4">
      <label
        className={cx(
          "inline-flex w-64 items-center bg-neutral-200 bg-transparent py-1 text-neutral-400",
          { "cursor-not-allowed opacity-40": noIcons && !search }
        )}
      >
        <Icon icon="search" size={16} className="text-current" />
        <input
          className="ml-2 h-6 w-full rounded-sm border-none bg-transparent text-sm text-current outline-none disabled:cursor-not-allowed"
          onKeyUp={handleSearch}
          placeholder="Search..."
          disabled={noIcons && !search}
        />
      </label>
      <ImportButton className="order-2 sm:order-1" />
    </div>
  );
};

export default IconsAppHeader;
