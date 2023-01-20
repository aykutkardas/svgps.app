import ReactPaginate from "react-paginate";

function Pagination() {
  return (
    <ReactPaginate
      pageCount={20}
      className="flex gap-2 text-sm text-neutral-500"
      activeClassName="text-fuchsia-600"
    />
  );
}
export default Pagination;
