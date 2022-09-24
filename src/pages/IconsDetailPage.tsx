import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { IconsProvider } from "src/context/IconsContext";
import IconSetPreview from "src/components/IconSetPreview";
import icons from "src/icons";

const IconsDetailPage = () => {
  let params = useParams();

  const iconFileName =
    params.iconSet + (params.variant ? `-${params.variant}` : "");

  const iconSet = require(`../assets/icons/${iconFileName}.json`);

  const iconDetail = icons.find((icon) => icon.slug === params.iconSet);

  return (
    <IconsProvider>
      <div className="my-auto py-8">
        <Helmet>
          <title>SVGPS - {iconDetail.name} - Icon Store</title>
        </Helmet>
        <IconSetPreview
          key={iconFileName}
          variant={params.variant}
          iconSet={iconSet}
          data={iconDetail}
        />
      </div>
    </IconsProvider>
  );
};

export default IconsDetailPage;
