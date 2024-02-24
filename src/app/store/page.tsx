"use client";

import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import IconSetCard from "src/components/IconSetCard";
import Icon from "src/components/Icon";

import iconSets from "src/iconSets";
import useDebounce from "src/hooks/useDebounce";
import IconSetPreview from "src/components/IconSetPreview";
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
  const cardsRef = useRef(null);

  const handlePageChange = (currentPage) => {
    setSearchPageData({ ...searchPageData, currentPage });
  };

  const getSearchedIcons = (page = 1) => {
    setSearchLoading(true);

    fetch(`/api/icon-search?q=${search}&page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setFoundedIcons(res.icons);
        setSearchPageData({
          count: res.count,
          currentPage: parseInt(res.page),
          totalPages: res.totalPage,
          pageSize: 60,
        });
        setSearchLoading(false);
      })
      .catch(() => {
        setFoundedIcons([]);
        setSearchLoading(false);
        setSearchPageData(initialSearchPageData);
      });
  };

  const handleMouseMove = (e: MouseEvent) => {
    // @ts-ignore
    for (const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  useEffect(() => {
    if (search.length > 0) return;
    const el = cardsRef?.current;

    if (!el) return;

    (el as Element).addEventListener("mousemove", handleMouseMove);

    return () =>
      (el as Element).removeEventListener("mousemove", handleMouseMove);
  }, [search]);

  useDebounce(
    () => {
      if (search.length > 2) getSearchedIcons();
      else setFoundedIcons([]);
    },
    [iconSets, search],
    250,
  );

  useEffect(() => {
    setSearch("");
  }, [router]);

  useEffect(() => {
    if (search.length < 3) return;
    getSearchedIcons(searchPageData.currentPage);
  }, [searchPageData.currentPage]);

  const handleSearch = ({ target }) => {
    const newValue = target.value;
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
            search.length ? "mt-10" : "mt-36 sm:mt-48",
          )}
        >
          <label
            className={clsx(
              "group relative  mb-3 inline-flex w-full items-center rounded-3xl border bg-neutral-50 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 sm:w-4/5 md:w-3/5 lg:w-2/5",
              searchActive || search.length
                ? "border-purple-500/50"
                : "border-neutral-50 dark:border-neutral-800",
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
            <IconSetPreview
              key={JSON.stringify(foundedIcons)}
              loading={searchLoading}
              isSearch={true}
              data={{ link: "https://svgps.app", variants: [] }}
              iconSet={{ icons: foundedIcons }}
              paginationData={searchPageData}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        {search.length === 0 && (
          <div
            id="cards"
            ref={cardsRef}
            className="mt-10 flex flex-wrap justify-center"
          >
            {iconSets.map((iconSet) => (
              <IconSetCard
                key={iconSet.slug}
                slug={iconSet.slug}
                name={iconSet.name}
                creator={iconSet.creator}
                licence={iconSet.licence}
                count={iconSet.count}
                iconSet={iconSet.icons}
                variants={iconSet.variants || []}
              />
            ))}
          </div>
        )}
      </div>
      {search.length === 0 && <Footer />}
    </div>
  );
};

export default StorePage;
