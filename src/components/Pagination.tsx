import ReactPaginate from "react-paginate";

import Icon from "./Icon";

function Pagination({ page = 1, pageCount = 20, onChange }) {
  const handlePageChange = ({ selected }) => {
    onChange(selected + 1);
  };

  return (
    <ReactPaginate
      nextLabel={
        <Icon
          icon="chevron-right"
          size={16}
          className="text-neutral-600 hover:text-neutral-400"
        />
      }
      previousLabel={
        <Icon
          icon="chevron-left"
          size={16}
          className="text-neutral-600 hover:text-neutral-400"
        />
      }
      onPageChange={handlePageChange}
      pageLinkClassName="inline-flex items-center justify-center cursor-pointer px-1"
      pageRangeDisplayed={2}
      pageCount={pageCount}
      forcePage={page}
      pageClassName=" hover:text-neutral-400 mt-1"
      className="flex select-none items-center justify-center text-sm text-neutral-500 md:gap-4"
      activeClassName="w-7 h-7 flex items-center justify-center text-purple-600 hover:text-purple-500 rounded-md border border-purple-500"
    />
  );
}
export default Pagination;
