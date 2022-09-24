import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import IconSetCard from "src/components/IconSetCard";

import icons from "../icons";

const IconsPage = () => {
  const iconCount = icons.reduce((acc, iconSet) => acc + iconSet.count, 0);

  return (
    <div className="my-auto mt-[20%] flex w-full flex-col md:mt-[10%]">
      <Helmet>
        <title>SVGPS - Icon Store</title>
      </Helmet>
      <div className="mb-10 flex flex-col items-center justify-center dark:text-white">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Choose what you want from{" "}
          <b className="mx-1 text-purple-500">{iconCount} icons</b> and use
          them.
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
        {icons.map((iconSet) => (
          <Link
            key={iconSet.slug}
            className="w-full p-3 sm:w-1/2 md:w-1/3 lg:w-1/4"
            to={`/store/${iconSet.slug}`}
          >
            <IconSetCard
              name={iconSet.name}
              creator={iconSet.creator}
              licence={iconSet.licence}
              count={iconSet.count}
              iconSet={iconSet.icons}
              variants={iconSet.variants || []}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IconsPage;
