import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import { IconsProvider } from "src/context/IconsContext";
import IconSetPreview from "src/components/IconSetPreview";
import icons from "src/icons";

const StoreDetailPageWithVariant = ({ iconSet, iconDetail, variant }) => (
  <IconsProvider>
    <div className="my-auto py-8">
      <Head>
        <title>SVGPS - {iconDetail.name} - Icon Store</title>
      </Head>
      <IconSetPreview
        key={iconDetail.slug + variant}
        variant={variant}
        iconSet={iconSet}
        data={iconDetail}
      />
    </div>
  </IconsProvider>
);

export default StoreDetailPageWithVariant;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = {
    iconDetail: icons.find((icon) => icon.slug === params.iconSet),
    iconSet: require(`src/assets/icons/${params.iconSet}-${params.variant}.json`),
    variant: params.variant,
  };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: icons
    .flatMap((iconSet) =>
      iconSet.variants?.map(
        (variant) => `/store/${iconSet.slug}/${variant.toLowerCase()}`
      )
    )
    .filter(Boolean),
});
