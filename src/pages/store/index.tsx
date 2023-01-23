import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import IconSetCard from "src/components/IconSetCard";
import Icon from "src/components/Icon";

import iconSets from "src/iconSets";
import useDebounce from "src/hooks/useDebounce";
import IconSetPreview from "src/components/IconSetPreview";
import { IconsProvider } from "src/context/IconsContext";

const iconCount = iconSets.reduce((acc, iconSet) => acc + iconSet.count, 0);

const initialSearchPageData = {
  pageSize: 0,
  currentPage: 1,
  count: 0,
  totalPages: 0,
};

const StorePage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [foundedIcons, setFoundedIcons] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPageData, setSearchPageData] = useState(initialSearchPageData);

  const handlePageChange = (currentPage) => {
    setSearchPageData({ ...searchPageData, currentPage });
  };

  const getSearchedIcons = (page = 1) => {
    setSearchLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?q=${search}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setFoundedIcons(res.result);
        setSearchPageData(res.countInfo);
        setSearchLoading(false);
      })
      .catch((err) => {
        setFoundedIcons([]);
        setSearchLoading(false);
        setSearchPageData(initialSearchPageData);
      });
  };

  useDebounce(
    () => {
      if (search.length > 2) getSearchedIcons();
      else setFoundedIcons([]);
    },
    [iconSets, search],
    250
  );

  useEffect(() => {
    setSearch("");
  }, [router]);

  useEffect(() => {
    getSearchedIcons(searchPageData.currentPage);
  }, [searchPageData.currentPage]);

  const handleSearch = ({ target }) => {
    const newValue = target.value.trim();
    if (newValue === search) return;
    setSearch(newValue);
  };

  const handleFocus = () => setSearchActive(true);
  const handleBlur = () => setSearchActive(false);

  return (
    <div className="container mx-auto flex min-h-screen flex-col p-3">
      <Head>
        <title>SVGPS - Icon Store</title>
      </Head>
      <Header />
      <div className="flex w-full flex-col">
        <div
          className={clsx(
            "relative mx-2 mb-10  flex flex-col items-center justify-center drop-shadow-lg transition-all",
            search.length ? "mt-10" : "mt-36 sm:mt-48"
          )}
        >
          <label
            className={clsx(
              "group relative  mb-3 inline-flex w-full items-center rounded-3xl border bg-neutral-50 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 sm:w-4/5 md:w-3/5 lg:w-2/5",
              searchActive || search.length
                ? "border-purple-500/50"
                : "border-neutral-50 dark:border-neutral-800"
            )}
          >
            <input
              className="ml-2 w-full bg-transparent p-3 text-base outline-none placeholder:opacity-60 md:text-sm"
              placeholder="Search icon..."
              value={search}
              onChange={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Icon icon="search" size={16} className="mr-4 text-current" />
          </label>
          <p className="text-center text-xs text-neutral-500  dark:text-neutral-300">
            Choose what you want from{" "}
            <b className="mx-1 text-purple-500">
              {new Intl.NumberFormat("en").format(iconCount)}
            </b>{" "}
            icons and use them.
          </p>
        </div>
        {search.length > 2 && (
          <div>
            <IconsProvider>
              <IconSetPreview
                key={JSON.stringify(foundedIcons)}
                loading={searchLoading}
                isSearch={true}
                data={{ link: "https://svgps.app", variants: [] }}
                iconSet={{ icons: foundedIcons }}
                paginationData={searchPageData}
                onPageChange={handlePageChange}
              />
            </IconsProvider>
          </div>
        )}
        {search.length === 0 && (
          <div className="mt-10 flex flex-wrap justify-center">
            {iconSets.map((iconSet) => (
              <Link key={iconSet.slug} href={`/store/${iconSet.slug}`}>
                <a className="m-3 w-80">
                  <IconSetCard
                    name={iconSet.name}
                    creator={iconSet.creator}
                    licence={iconSet.licence}
                    count={iconSet.count}
                    iconSet={iconSet.icons}
                    variants={iconSet.variants || []}
                  />
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
      {search.length === 0 && <Footer />}
    </div>
  );
};

export default StorePage;
