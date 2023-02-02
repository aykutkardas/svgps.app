import Link from "next/link";

interface CollectionCardProps {
  name: string;
  id: string;
  count: number;
}

const CollectionCard = ({ name, id, count }: CollectionCardProps) => (
  <div className="card m-[10px] h-40 w-80 select-none p-[1px]">
    <Link href={`/collection/${id}`} passHref>
      <a className="card-content  bg-gradient-to-t  dark:from-neutral-800 dark:to-neutral-900">
        <div className="bg-red relative flex h-full flex-col justify-between p-3 transition">
          <div className="align-center flex flex-wrap justify-between">
            <div>
              <h2 className="text-base font-medium text-neutral-600 dark:text-neutral-300">
                {name}
              </h2>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between">
            <div className="flex flex-col items-end pt-2">
              <span className="text-xs text-neutral-500">
                <span className="text-neutral-400">{count}</span> icons
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default CollectionCard;
