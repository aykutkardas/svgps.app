import cx from "classnames";

import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";

interface INewIconBoxProps {
  isGrid: boolean;
}

const NewIconBox = ({ isGrid }: INewIconBoxProps) => (
  <ImportWrapper
    className={cx(
      "flex items-center",
      isGrid && "justify-center pb-6",
      !isGrid && "mt-5"
    )}
  >
    <div
      className={cx(
        isGrid
          ? "mb-3 flex h-[60px] w-[60px] flex-col items-center justify-center md:h-[100px] md:w-[100px]"
          : "flex w-full items-center p-1",
        "rounded-lg border border-dashed border-neutral-400 hover:border-neutral-500 dark:border-neutral-600 hover:dark:border-neutral-400",
        "cursor-pointer text-neutral-400 hover:text-neutral-600 dark:text-neutral-600 hover:dark:text-neutral-400"
      )}
    >
      <Icon icon="close" size={20} className="rotate-45" />
      {!isGrid && <span className="ml-2 w-full text-xs">Import Icon</span>}
    </div>
  </ImportWrapper>
);

export default NewIconBox;
