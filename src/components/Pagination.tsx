import ReactPaginate from "react-paginate";

import Icon from "./Icon";

function Pagination({ page = 1, pageCount = 20, onChange }) {
  const handlePageChange = ({ selected }) => {
    onChange(selected + 1);
  };

  const linkClassName =
    "flex h-8 min-w-8 items-center justify-center rounded-lg px-2 transition hover:bg-white/[0.06] hover:text-fg";

  return (
    <ReactPaginate
      nextLabel={<Icon icon="chevron-right" size={16} />}
      previousLabel={<Icon icon="chevron-left" size={16} />}
      onPageChange={handlePageChange}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      forcePage={page}
      className="flex items-center justify-center gap-1 text-sm text-fg-muted select-none"
      pageLinkClassName={linkClassName}
      previousLinkClassName={linkClassName}
      nextLinkClassName={linkClassName}
      breakLinkClassName={linkClassName}
      activeLinkClassName="bg-accent-soft! font-medium text-accent-fg! shadow-[inset_0_0_0_1px_rgb(139_92_246/0.45)]"
      disabledLinkClassName="pointer-events-none opacity-30"
    />
  );
}
export default Pagination;
