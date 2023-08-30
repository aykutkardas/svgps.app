import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "src/components/Header";
import IconSetPreview from "src/components/IconSetPreview";
import iconSets, { VARIANTS } from "src/iconSets";
import cache from "src/utils/cache";

const StoreDetailPage = ({ variant }) => {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();
  const iconSetSlug = `${query.iconSet || "_"}`;
  const iconSetSlugWithVariant = `${query.iconSet || "_"}-${query.variant}`;

  const iconDetail = iconSets.find((icon) => icon.slug === iconSetSlug);

  const getIcons = async () => {
    const iconPath = `${process.env.NEXT_PUBLIC_API_URL}/icon-set?slug=${iconSetSlugWithVariant}&page={{page}}`;

    if (cache.get(iconSetSlugWithVariant)?.length > 0) {
      setIcons(cache.get(iconSetSlugWithVariant));
      return;
    }

    setLoading(true);

    const collectedIcons = [];
    let totalPage = 1;

    try {
      const response = await fetch(iconPath.replace("{{page}}", "1"));
      const { countInfo, result } = await response.json();

      totalPage = countInfo.totalPages;

      collectedIcons.push(...result);

      for (let page = 2; page <= totalPage; page++) {
        const res = await fetch(iconPath.replace("{{page}}", `${page}`));
        const { result: data } = await res.json();
        collectedIcons.push(...data);
      }

      setIcons(collectedIcons);
      cache.set(iconSetSlugWithVariant, collectedIcons);
    } catch (e) {
      console.log({ error: e });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIcons();
  }, [iconSetSlug, iconSetSlugWithVariant]);

  return (
    <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
      <Head>
        <title>SVGPS - {iconDetail?.name} - Icon Store</title>
      </Head>
      <Header />
      <div className="py-3">
        <IconSetPreview
          variant={variant}
          iconSet={{ icons }}
          loading={loading}
          // @ts-expect-error
          data={iconDetail}
        />
      </div>
    </div>
  );
};

export default StoreDetailPage;

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    variant: VARIANTS[params.variant.toString()],
  },
});

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: iconSets
    .flatMap((iconSet) =>
      iconSet.variants
        ?.slice(1)
        ?.map((variant) => `/store/${iconSet.slug}/${variant.slug}`)
    )
    .filter(Boolean),
});
