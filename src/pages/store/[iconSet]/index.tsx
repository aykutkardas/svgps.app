import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Header from "src/components/Header";
import IconSetPreview from "src/components/IconSetPreview";
import iconSets from "src/iconSets";
import cache from "src/utils/cache";

const StoreDetailPage = ({}) => {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  const { query } = useRouter();
  const iconSetSlug = `${query.iconSet || "_"}`;

  const iconDetail = iconSets.find((icon) => icon.slug === iconSetSlug);

  const getIcons = () => {
    if (cache.get(iconSetSlug)?.length > 0) {
      setIcons(cache.get(iconSetSlug));
      return;
    }
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/icon-set?slug=${iconSetSlug}`)
      .then((res) => res.json())
      .then((res) => {
        cache.set(iconSetSlug, res);
        setIcons(res);
      })
      .catch(() => {
        setIcons([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!iconSetSlug || icons.length > 0) return;

    getIcons();
  }, [iconSetSlug]);

  return (
    <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
      <Head>
        <title>SVGPS - {iconDetail?.name} - Icon Store</title>
      </Head>
      <Header />
      <div className="py-3">
        <IconSetPreview
          variant={null}
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

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: false,
  paths: iconSets.map((iconSet) => `/store/${iconSet.slug}`),
});
