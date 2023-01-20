import Pagination from "./Pagination";

interface IconSetPreviewSearchFooterProps {
  iconCount: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const IconSetPreviewSearchFooter = ({
  iconCount,
  pageCount,
  onPageChange,
}: IconSetPreviewSearchFooterProps) => {
  return (
    <>
      <div className="min-h-20 z-10 flex flex-col items-center justify-between gap-3 divide-neutral-300 bg-neutral-100 p-4 dark:bg-neutral-800 sm:flex-row">
        <div className="text-xs text-neutral-500">
          {`${iconCount} ${iconCount > 1 ? "icons" : "icon"}`}
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 divide-neutral-300 dark:divide-neutral-600 sm:order-2 sm:flex-row sm:space-y-0 sm:divide-x">
          <Pagination onChange={onPageChange} pageCount={pageCount} />
        </div>
      </div>
    </>
  );
};

export default IconSetPreviewSearchFooter;
