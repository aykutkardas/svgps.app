import Icon from "src/components/Icon";

const SupportButton = () => (
  <a
    href="https://www.buymeacoffee.com/aykutkardas"
    target="_blank"
    rel="noreferrer"
    aria-label="Buy Me a Coffee"
    title="Buy Me a Coffee"
    className="group fixed right-5 bottom-5 z-30 inline-flex h-10 items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 text-sm font-medium text-amber-300 shadow-elevated backdrop-blur-md transition hover:border-amber-400/60 hover:bg-amber-400/20"
  >
    <Icon
      icon="coffee"
      size={18}
      className="transition group-hover:-rotate-12"
    />
    <span className="hidden sm:inline">Buy me a coffee</span>
  </a>
);

export default SupportButton;
