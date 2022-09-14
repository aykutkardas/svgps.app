import { Link } from "react-router-dom";
import IconSetCard from "src/components/IconSetCard";

import icons from "../icons";

const IconsPage = () => (
  <div className="my-auto py-8">
    {icons.map((iconSet) => (
      <Link to={`/icons/${iconSet.slug}`}>
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
