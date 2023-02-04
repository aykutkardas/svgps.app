import Link from "next/link";

import Icon from "src/components/Icon";

interface CollectionCardProps {
  name: string;
  id: string;
  count: number;
  userAvatars: string[];
}

const CollectionCard = ({
  name,
  id,
  count,
  userAvatars,
}: CollectionCardProps) => (
  <div className="card m-[10px] h-40 w-80 select-none overflow-hidden p-[1px]">
    <Link href={`/collection/${id}`} passHref>
      <a className="card-content  bg-gradient-to-t  dark:from-neutral-800 dark:to-neutral-900">
        <Icon
          icon="package"
          size={300}
          className="absolute -right-20 -top-3 dark:text-neutral-700/20"
        />

        <div className="bg-red relative flex h-full flex-col justify-between p-3 transition">
          <div className="align-center flex flex-wrap justify-between">
            <div>
              <h2 className="text-base font-medium text-neutral-600 dark:text-neutral-300">
                {name}
              </h2>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between">
            <span className="pt-2 text-xs  text-neutral-500">
              <span className="text-neutral-400">{count}</span> icons
            </span>
            <div>
              {userAvatars.map((avatar) => (
                <img
                  key={avatar}
                  src={avatar}
                  className="h-7 w-7 rounded-full border border-black/10 shadow-xl"
                  onError={(e) =>
                    e.currentTarget.setAttribute("src", "/images/avatar.png")
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  </div>
);

export default CollectionCard;
