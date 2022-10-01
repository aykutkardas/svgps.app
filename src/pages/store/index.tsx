import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Header from "src/components/Header";
import Footer from "src/components/Footer";
import IconSetCard from "src/components/IconSetCard";
import Icon from "src/components/Icon";

import icons from "src/icons";

const iconCount = icons.reduce((acc, iconSet) => acc + iconSet.count, 0);

const StorePage = () => {
  const [search, setSearch] = useState("");

  const filteredIconSets = icons.filter((iconSet) =>
    iconSet.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearch = ({ target }) => setSearch(target.value);

  const noIconSets = filteredIconSets.length === 0;

  return (
    <div className="container mx-auto flex h-screen flex-col p-3">
      <Header />
      <div className="my-[20%] flex w-full flex-col md:my-[10%]">
        <Head>
          <title>SVGPS - Icon Store</title>
        </Head>
        <div className="mb-10 flex w-full justify-center">
          <label className="inline-flex w-2/5 items-center rounded-md bg-neutral-100 p-1 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-500">
            <Icon icon="search" size={16} className="text-current" />
            <input
              className="ml-2 w-full bg-transparent p-1 text-sm placeholder-current outline-none"
              placeholder="Search icon set..."
              onKeyUp={handleSearch}
            />
          </label>
        </div>
        <div className="mb-10 flex flex-col items-center justify-center dark:text-white">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Choose what you want from{" "}
            <b className="mx-1 text-purple-500">{iconCount} icons</b> and use
            them.
          </p>
        </div>
        <div className="mb-10 flex flex-wrap justify-center">
          {search && noIconSets && (
            <p className="p-4 text-sm text-neutral-500">No icon sets found.</p>
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
