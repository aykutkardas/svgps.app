import clsx from "clsx";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

const SupportActions = ({ isSearch }: { isSearch?: boolean }) => (
  <div
    className={clsx(
      "hidden flex-1 items-center gap-1 sm:inline-flex",
      isSearch ? "justify-start" : "justify-center"
    )}
  >
    <Tooltip message="Buy Me a Coffee">
      <a
        href="https://www.buymeacoffee.com/aykutkardas"
        target="_blank"
        rel="noreferrer"
        aria-label="Buy Me a Coffee"
        title="Buy Me a Coffee"
        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-purple-400 shadow-xl transition hover:opacity-60"
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
        className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full  text-purple-400 shadow-xl transition hover:opacity-60"
      >
        <Icon icon="heart" size={19} />
      </a>
    </Tooltip>
  </div>
);

export default SupportActions;
