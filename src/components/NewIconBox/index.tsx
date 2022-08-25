import cx from "classnames";

import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";

const NewIconBox = () => (
  <ImportWrapper className="flex items-center justify-center pb-8">
    <div
      className={cx(
        "flex flex-col items-center justify-center",
        "w-[60px] h-[60px] md:w-[100px] md:h-[100px] mb-3",
        "rounded-lg border border-dashed border-neutral-600 hover:border-neutral-500",
        "text-neutral-600 hover:text-neutral-500 cursor-pointer"
      )}
    >
      <Icon icon="cross" size={20} className="rotate-45" />
    </div>
  </ImportWrapper>
);

export default NewIconBox;
