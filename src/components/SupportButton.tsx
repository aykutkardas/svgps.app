import clsx from "clsx";

import Icon from "src/components/Icon";

const SupportButton = () => (
  <a
    href="https://www.buymeacoffee.com/aykutkardas"
    target="_blank"
    rel="noreferrer"
    aria-label="Buy Me a Coffee"
    title="Buy Me a Coffee"
    className={clsx(
      "absolute bottom-4 right-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-500 text-white shadow-xl transition hover:scale-110"
    )}
  >
    <Icon icon="coffee" size={22} />
  </a>
);

export default SupportButton;
