import Icon from "./Icon";

interface IconSetCardProps {
  iconSet: {
    name: string;
    creator: string;
    licence: string;
    icons: string[];
  };
}

const IconSetCard = ({ iconSet }: IconSetCardProps) => (
  <div className="m-5 flex w-80 cursor-pointer flex-col gap-6 border border-neutral-700 p-5 hover:border-neutral-500">
    <div className="align-center flex justify-between">
      <div>
        <h2 className="text-lg text-neutral-600 dark:text-neutral-300">
          {iconSet.name}
        </h2>
        <h3 className="pt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {iconSet.creator}
        </h3>
      </div>
      <span className="text-sm text-neutral-600 dark:text-neutral-500">
        {iconSet.licence}
      </span>
    </div>

    <div className="mt-5 flex justify-between">
      <span>
        {iconSet.icons.map((name) => (
          <Icon icon={name} className="mr-1 h-5 w-5 text-neutral-500" />
        ))}
      </span>
      <span className="pt-2 text-xs text-neutral-400">
        {iconSet.icons.length} icons
      </span>
    </div>
  </div>
);

export default IconSetCard;
