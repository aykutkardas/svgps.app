import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import Header from "src/components/Header";
import { IconsProvider } from "src/context/IconsContext";
import IconSetPreview from "src/components/IconSetPreview";
import iconSets from "src/iconSets";

const StoreDetailPage = ({ iconSet, iconDetail }) => (
  <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
    <Head>
      <title>SVGPS - {iconDetail.name} - Icon Store</title>
    </Head>
    <Header />
    <IconsProvider>
      <div className="py-3">
        <IconSetPreview
          key={iconDetail.slug}
          variant={null}
          iconSet={iconSet}
          data={iconDetail}
        />
      </div>
    </IconsProvider>
  </div>
);

export default StoreDetailPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = {
    iconDetail: iconSets.find((icon) => icon.slug === params.iconSet),
    iconSet: require(`src/assets/icons/${params.iconSet}.json`),
  };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: iconSets.map((iconSet) => `/store/${iconSet.slug}`),
});
