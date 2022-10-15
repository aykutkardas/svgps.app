import clsx from "clsx";

import Icon from "src/components/Icon";

const IconSetSearch = ({ disabled = false, search, setSearch }) => {
  const handleSearch = ({ target }) => setSearch(target.value);
  const clearSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };

  return (
    <label
      className={clsx(
        "inline-flex items-center bg-transparent py-1 text-neutral-400 relative",
        { "cursor-not-allowed opacity-40": disabled }
      )}
    >
      <Icon icon="search" size={16} className="text-current" />
      <input
        value={search}
        className="ml-2 h-6 w-16 rounded-sm border-none bg-transparent text-sm text-current outline-none transition-all focus:w-44 disabled:cursor-not-allowed"
        onChange={handleSearch}
        placeholder="Search..."
        disabled={disabled}
      />
      {search.length > 0 && (
        <Icon
          icon="x-circle"
          size={16}
          className="right-0 ml-2 absolute cursor-pointer text-current"
          onClick={clearSearch}
        />
      )}
    </label>
  );
};

export default IconSetSearch;
