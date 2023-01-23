import Pagination from "./Pagination";

interface IconSetPreviewSearchFooterProps {
  paginationData?: {
    currentPage: number;
    pageSize: number;
    count: number;
    totalPages: number;
  };
  onPageChange: (activePage: number) => void;
}

const IconSetPreviewSearchFooter = ({
  paginationData,
  onPageChange,
}: IconSetPreviewSearchFooterProps) => {
  return (
    <>
      <div className="min-h-20 z-10 flex items-center justify-between gap-3 divide-neutral-300 bg-neutral-100 p-4 dark:bg-neutral-800">
        <div className="text-xs text-neutral-500">
          {`${paginationData.count} ${
            paginationData.count > 1 ? "icons" : "icon"
          }`}
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row sm:space-y-0 sm:divide-x">
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
