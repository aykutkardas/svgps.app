import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";

import Header from "src/components/Header";
import { IconsProvider } from "src/context/IconsContext";
import IconSetPreview from "src/components/IconSetPreview";
import icons, { VARIANTS } from "src/iconSets";

const StoreDetailPageWithVariant = ({ iconSet, iconDetail, variant }) => (
  <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
    <Head>
      <title>SVGPS - {iconDetail.name} - Icon Store</title>
    </Head>
    <Header />
    <IconsProvider>
      <div className="py-3">
        <IconSetPreview
          key={iconDetail.slug + variant.slug}
          variant={variant}
          iconSet={iconSet}
          data={iconDetail}
        />
      </div>
    </IconsProvider>
  </div>
);

export default StoreDetailPageWithVariant;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const props = {
    iconDetail: icons.find((icon) => icon.slug === params.iconSet),
    iconSet: require(`src/assets/icons/${params.iconSet}-${params.variant}.json`),
    variant: VARIANTS[params.variant.toString()],
  };

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: icons
    .flatMap((iconSet) =>
      iconSet.variants
        ?.slice(1)
        ?.map((variant) => `/store/${iconSet.slug}/${variant.slug}`)
    )
    .filter(Boolean),
});
