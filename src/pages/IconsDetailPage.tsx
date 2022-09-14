import { useParams } from "react-router-dom";

import IconSetPreview from "src/components/IconSetPreview";

const IconsDetailPage = () => {
  let params = useParams();

  const iconSet = require(`../assets/icons/${params.iconSet}.json`);

  return (
    <div className="my-auto py-8">
      <IconSetPreview iconSet={iconSet} />
    </div>
  );
};

export default IconsDetailPage;
