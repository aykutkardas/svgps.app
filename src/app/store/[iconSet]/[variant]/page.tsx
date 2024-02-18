"use client";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Header from "src/components/Header";
import IconSetPreview from "src/components/IconSetPreview";
import iconSets, { VARIANTS } from "src/iconSets";
import cache from "src/utils/cache";

const StoreDetailPage = () => {
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const iconSetSlug = `${params?.iconSet || "_"}`;
  const iconSetSlugWithVariant = `${params?.iconSet || "_"}-${params?.variant}`;

  const iconDetail = iconSets.find((icon) => icon.slug === iconSetSlug);

  const getIcons = async () => {
    const iconPath = `/api/icon-set?slug=${iconSetSlugWithVariant}&page={{page}}`;

    if (cache.get(iconSetSlugWithVariant)?.length > 0) {
      // @ts-ignore
      setIcons(cache.get(iconSetSlugWithVariant));
      return;
    }

    setLoading(true);

    const collectedIcons = [];
    let totalPage = 1;

    try {
      const response = await fetch(iconPath.replace("{{page}}", "1"));
      const {
        totalPage: pageCount,
        icons,
      }: { totalPage: number; icons: never[] } = await response.json();

      totalPage = pageCount;

      collectedIcons.push(...icons);

      for (let page = 2; page <= totalPage; page++) {
        const res = await fetch(iconPath.replace("{{page}}", `${page}`));
        const { icons: data }: { icons: never[] } = await res.json();
        collectedIcons.push(...data);
      }

      setIcons(collectedIcons);
      cache.set(iconSetSlug, collectedIcons);
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
          variant={VARIANTS[params?.variant as string]}
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
