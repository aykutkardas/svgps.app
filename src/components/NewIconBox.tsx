import clsx from "clsx";

import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";

const NewIconBox = () => (
  <ImportWrapper className="flex items-center justify-center pb-6">
    <div
      className={clsx(
        "flex flex-col items-center justify-center",
        "mb-3 h-16 w-16 sm:h-[70px] sm:w-[70px]",
        "rounded-lg border border-dashed border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 hover:dark:border-neutral-500",
        "cursor-pointer text-neutral-300 hover:text-neutral-400 dark:text-neutral-600 hover:dark:text-neutral-500"
      )}
    >
      <Icon icon="close" size={20} className="rotate-45" />
    </div>
  </ImportWrapper>
);

export default NewIconBox;
