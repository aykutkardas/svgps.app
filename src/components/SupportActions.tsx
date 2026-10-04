import clsx from "clsx";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

const SupportActions = ({ isSearch }: { isSearch?: boolean }) => (
  <div
    className={clsx(
      "hidden flex-1 items-center gap-1 sm:inline-flex",
      isSearch ? "justify-end" : "justify-center",
    )}
  >
    <Tooltip message="Buy Me a Coffee">
      <a
        href="https://www.buymeacoffee.com/aykutkardas"
        target="_blank"
        rel="noreferrer"
        aria-label="Buy Me a Coffee"
        title="Buy Me a Coffee"
        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-fg-subtle transition hover:bg-amber-400/10 hover:text-amber-300"
      >
        <Icon icon="coffee" size={16} />
      </a>
    </Tooltip>
    <Tooltip message="Sponsor Us">
      <a
        href="https://github.com/aykutkardas/svgps.app#become-a-sponsor-to-core-maintainers-"
        target="_blank"
        rel="noreferrer"
        aria-label="Sponsor Us"
        title="Sponsor Us"
        className="inline-flex size-8 cursor-pointer items-center justify-center rounded-lg text-fg-subtle transition hover:bg-pink-400/10 hover:text-pink-300"
      >
        <Icon icon="heart" size={17} />
      </a>
    </Tooltip>
  </div>
);

export default SupportActions;
