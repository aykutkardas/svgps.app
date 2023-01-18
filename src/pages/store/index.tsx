import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import clsx from "clsx";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import IconSetCard from "src/components/IconSetCard";
import Icon from "src/components/Icon";

import icons from "src/icons";
import useDebounce from "src/hooks/useDebounce";

const iconCount = icons.reduce((acc, iconSet) => acc + iconSet.count, 0);

const StorePage = () => {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [filteredIconSets, setFilteredIconSets] = useState(icons);

  useDebounce(
    () => {
      setFilteredIconSets(
        icons.filter((iconSet) =>
          iconSet.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    },
    [icons, search],
    200
  );

  const handleSearch = ({ target }) => setSearch(target.value);
  const handleFocus = () => setSearchActive(true);
  const handleBlur = () => setSearchActive(false);

  const noIconSets = filteredIconSets.length === 0;

  return (
    <div className="container mx-auto flex flex-col p-3">
      <Head>
        <title>SVGPS - Icon Store</title>
      </Head>
      <Header />
      <div className="flex w-full flex-1 flex-col">
        <div className="relative mx-2 mt-10 flex h-60 flex-col items-center justify-center drop-shadow-lg filter sm:mt-0 sm:h-80">
          <label
            className={clsx(
              "group relative  mb-3 inline-flex w-full items-center rounded-3xl border bg-neutral-50 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-500 sm:w-4/5 md:w-3/5 lg:w-2/5",
              searchActive
                ? "border-purple-500/50"
                : "border-neutral-50 dark:border-neutral-800"
            )}
          >
            <input
              className="ml-2 w-full  bg-transparent p-3 text-sm outline-none placeholder:opacity-60"
              placeholder="Search icon set..."
              onKeyUp={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Icon icon="search" size={16} className="mr-4 text-current" />
          </label>
          <p className="text-center text-sm text-neutral-600 opacity-60 dark:text-neutral-400">
            Choose what you want from{" "}
            <b className="mx-1 text-purple-500">
              {new Intl.NumberFormat("en").format(iconCount)} icons
            </b>{" "}
            and use them.
          </p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center">
          {search && noIconSets && (
            <p className="h-40 p-4 text-sm text-neutral-500">
              No icon sets found.
            </p>
          )}
          {filteredIconSets.map((iconSet) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default StorePage;
