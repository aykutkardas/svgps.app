import { Link } from "react-router-dom";
import IconSetCard from "src/components/IconSetCard";

import icons from "../icons";

const IconsPage = () => (
  <div className="my-auto flex w-full flex-wrap justify-center">
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
        />
      </Link>
    ))}
  </div>
);

export default IconsPage;
