import Head from "next/head";
import Link from "next/link";

import IconSetCard from "src/components/IconSetCard";

import icons from "../../icons";

const iconCount = icons.reduce((acc, iconSet) => acc + iconSet.count, 0);

const StorePage = () => (
  <div className="my-[20%] flex w-full flex-col md:my-[10%]">
    <Head>
      <title>SVGPS - Icon Store</title>
    </Head>
    <div className="mb-10 flex flex-col items-center justify-center dark:text-white">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Choose what you want from{" "}
        <b className="mx-1 text-purple-500">{iconCount} icons</b> and use them.
      </p>
    </div>
    <div className="mb-10 flex flex-wrap justify-center">
      {icons.map((iconSet) => (
        <Link key={iconSet.slug} href={`/store/${iconSet.slug}`}>
          <a className="w-full p-3 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <IconSetCard
              name={iconSet.name}
              creator={iconSet.creator}
              licence={iconSet.licence}
              count={iconSet.count}
              iconSet={iconSet.icons}
              variants={iconSet.variants || []}
            />
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export default StorePage;
