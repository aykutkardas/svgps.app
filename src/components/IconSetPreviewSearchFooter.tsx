import clsx from "clsx";
import Pagination from "./Pagination";

interface IconSetPreviewSearchFooterProps {
  paginationData: {
    currentPage: number;
    pageSize: number;
    count: number;
    totalPages: number;
  };
  loading?: boolean;
  onPageChange: (activePage: number) => void;
}

const IconSetPreviewSearchFooter = ({
  paginationData,
  loading,
  onPageChange,
}: IconSetPreviewSearchFooterProps) => {
  return (
    <>
      <div className="z-10 flex items-center justify-between gap-3 bg-surface-raised/60 px-4 py-3 backdrop-blur-md sm:px-5">
        <div className="text-xs text-fg-subtle">
          <span className="font-medium text-fg-muted">
            {new Intl.NumberFormat("en").format(paginationData.count)}
          </span>{" "}
          {paginationData.count > 1 ? "results" : "result"}
        </div>

        <div
          className={clsx(
            "flex items-center justify-center",
            loading ? "pointer-events-none opacity-60" : "",
          )}
        >
          <Pagination
            onChange={onPageChange}
            page={paginationData.currentPage - 1}
            pageCount={paginationData.totalPages}
          />
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewSearchFooter;
