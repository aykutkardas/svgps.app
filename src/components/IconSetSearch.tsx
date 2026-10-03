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
        "group relative flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-3 text-fg-subtle transition sm:flex-none",
        "focus-within:border-accent/60 focus-within:text-fg-muted focus-within:ring-4 focus-within:ring-accent/10",
        { "cursor-not-allowed opacity-40": disabled },
      )}
    >
      <Icon icon="search" size={15} className="shrink-0 text-current" />
      <input
        value={search}
        className={clsx(
          "h-full w-full min-w-0 bg-transparent text-sm text-fg outline-hidden transition-all disabled:cursor-not-allowed sm:w-36 sm:focus:w-52",
          search && "pr-5",
        )}
        onChange={handleSearch}
        placeholder="Search..."
        aria-label="Search in icons"
        disabled={disabled}
      />
      {search.length > 0 && (
        <Icon
          icon="x-circle"
          size={15}
          className="absolute right-2.5 cursor-pointer text-fg-subtle hover:text-fg"
          onClick={clearSearch}
        />
      )}
    </label>
  );
};

export default IconSetSearch;
