import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import IconSetCard from "src/components/IconSetCard";
import Icon from "src/components/Icon";

import icons from "src/icons";
import clsx from "clsx";

const iconCount = icons.reduce((acc, iconSet) => acc + iconSet.count, 0);

const StorePage = () => {
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const filteredIconSets = icons.filter((iconSet) =>
    iconSet.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = ({ target }) => setSearch(target.value);
  const handleFocus = () => setSearchActive(true);
  const handleBlur = () => setSearchActive(false);

  const noIconSets = filteredIconSets.length === 0;

  return (
    <div className="container mx-auto flex h-screen flex-col p-3">
      <Head>
        <title>SVGPS - Icon Store</title>
      </Head>
      <Header />
      <div className="flex w-full flex-1 flex-col">
        <div className="relative flex h-80 flex-col items-center justify-center drop-shadow-md filter">
          <label className="group relative mb-3 inline-flex w-full items-center rounded-3xl bg-neutral-50 text-neutral-600 shadow-xl dark:bg-neutral-900 dark:text-neutral-500 sm:w-4/5 md:w-3/5 lg:w-2/5">
            <div
              className={clsx(
                "absolute -z-10 h-full w-full bg-gradient-to-tr from-fuchsia-500/30 to-pink-400/40 transition-all duration-500",
                {
                  "blur-md": !searchActive,
                  "blur-xl": searchActive,
                }
              )}
            />
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
              <a className="w-full p-3 sm:w-1/2 md:w-1/3 lg:w-1/4">
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
