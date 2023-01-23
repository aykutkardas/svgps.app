import clsx from "clsx";
import SupportActions from "./SupportActions";

const IconSetPreviewSearchHeader = () => (
  <div className="flex items-center justify-between px-4 py-2">
    <SupportActions isSearch />
    <span className="ml-auto flex items-center text-xs text-neutral-400">
      Powered by{" "}
      <a
        href="https://www.altogic.com/?utm_source=svgps&amp;utm_medium=referral&amp;utm_campaign=sponsorship"
        target="_blank"
        rel="noreferrer"
        className="h-auto w-auto opacity-100 hover:opacity-70"
      >
        <img
          className="ml-1 mt-[2px] h-[23px]"
          src="/altogic.svg"
          alt="Altogic"
          title="Altogic"
        />
      </a>
    </span>
  </div>
);

export default IconSetPreviewSearchHeader;
