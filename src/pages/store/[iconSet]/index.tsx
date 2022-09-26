import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import { IconsProvider } from "src/context/IconsContext";
import IconSetPreview from "src/components/IconSetPreview";
import icons from "src/icons";

const StoreDetailPage = ({ iconSet, iconDetail }) => (
  <IconsProvider>
    <div className="my-auto py-8">
      <Head>
        <title>SVGPS - {iconDetail.name} - Icon Store</title>
      </Head>
      <IconSetPreview
        key={iconDetail.slug}
        variant={null}
        iconSet={iconSet}
        data={iconDetail}
      />
    </div>
  </IconsProvider>
);

export default StoreDetailPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = {
    iconDetail: icons.find((icon) => icon.slug === params.iconSet),
    iconSet: require(`src/assets/icons/${params.iconSet}.json`),
  };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: icons.map((iconSet) => `/store/${iconSet.slug}`),
});
