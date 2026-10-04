"use client";

import { useEffect, useRef, useState } from "react";
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
    <div className="container mx-auto flex min-h-screen flex-col">
      <Header />
      <main className="flex w-full flex-1 flex-col">
        <div
          className={clsx(
            "relative flex flex-col items-center text-center transition-all duration-300",
            search.length ? "mt-6 mb-6" : "mt-16 mb-12 sm:mt-24",
          )}
        >
          {!search.length && (
            <>
              <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-fg sm:text-5xl">
                Icon Store
              </h1>
              <p className="mt-3 mb-8 animate-fade-in text-sm text-fg-muted sm:text-base">
                Choose what you want from{" "}
                <b className="font-semibold text-accent-fg">
                  {new Intl.NumberFormat("en").format(iconCount)}
                </b>{" "}
                icons and use them.
              </p>
            </>
          )}
          <label
            className={clsx(
              "group relative flex h-14 w-full max-w-xl items-center gap-3 rounded-2xl border bg-surface/90 px-5 text-fg shadow-elevated backdrop-blur-md transition",
              searchActive || search.length
                ? "border-accent/60 ring-4 ring-accent/15"
                : "border-line-strong hover:border-white/20",
            )}
          >
            <Icon
              icon="search"
              size={18}
              className={clsx(
                "shrink-0 transition",
                searchActive ? "text-accent-fg" : "text-fg-subtle",
              )}
            />
            <input
              className="h-full w-full bg-transparent text-base outline-hidden"
              placeholder="Search icon..."
              aria-label="Search icons"
              value={search}
              onChange={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {search.length > 0 && (
              <button
                aria-label="Clear search"
                className="flex size-7 shrink-0 items-center justify-center rounded-lg text-fg-subtle transition hover:bg-white/[0.06] hover:text-fg"
                onClick={() => setSearch("")}
              >
                <Icon icon="close" size={14} />
              </button>
            )}
          </label>
          {search.length > 0 && search.length < 3 && (
            <p className="mt-3 text-xs text-fg-subtle">
              Type at least 3 characters to search.
            </p>
          )}
        </div>
        {search.length > 2 && (
          <div className="animate-fade-in pb-6">
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
            className="grid animate-fade-in grid-cols-1 gap-3 pb-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
      </main>
      {search.length === 0 && <Footer />}
    </div>
  );
};

export default StorePage;
