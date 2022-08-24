import ImportWrapper from "src/components/ImportWrapper";
import Icon from "src/components/Icon";

const NewIconBox = () => (
  <ImportWrapper className="flex items-center justify-center pb-8">
    <div className="flex flex-col items-center justify-center w-[90px] h-[90px] border-2 border-dashed border-neutral-600 hover:border-neutral-500 rounded-sm text-neutral-600 hover:text-neutral-500 cursor-pointer">
      <Icon icon="cross" size={20} className="rotate-45" />
    </div>
  </ImportWrapper>
);

export default NewIconBox;
