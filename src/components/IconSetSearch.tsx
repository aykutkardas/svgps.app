import clsx from "clsx";

import Icon from "src/components/Icon";

const IconSetSearch = ({ disabled = false, setSearch }) => {
  const handleSearch = ({ target }) => setSearch(target.value);

  return (
    <label
      className={clsx(
        "inline-flexitems-center bg-transparent py-1 text-neutral-400",
        { "cursor-not-allowed opacity-40": disabled }
      )}
    >
      <Icon icon="search" size={16} className="text-current" />
      <input
        className="ml-2 h-6 w-16 rounded-sm border-none bg-transparent text-sm text-current outline-none transition-all focus:w-44 disabled:cursor-not-allowed"
        onKeyUp={handleSearch}
        placeholder="Search..."
        disabled={disabled}
      />
    </label>
  );
};

export default IconSetSearch;
