import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import IconSetPreview from "src/components/IconSetPreview";
import icons from "src/icons";

const IconsDetailPage = () => {
  let params = useParams();

  const iconSet = require(`../assets/icons/${params.iconSet}.json`);

  const iconDetail = icons.find((icon) => icon.slug === params.iconSet);

  return (
    <div className="my-auto py-8">
      <Helmet>
        <title>SVGPS - {iconDetail.name} - Icon Store</title>
      </Helmet>
      <IconSetPreview iconSet={iconSet} data={iconDetail} />
    </div>
  );
};

export default IconsDetailPage;
