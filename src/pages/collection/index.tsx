import { useEffect, useRef } from "react";
import Head from "next/head";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import clsx from "clsx";

import Header from "src/components/Header";
import IconSetPreview from "src/components/IconSetPreview";
import CollectionCard from "src/components/CollectionCard";
import Icon from "src/components/Icon";
import { useAuthContext } from "src/context/AuthContext";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";
import { createCollection } from "src/api/collection";

const CollectionPage = () => {
  const { auth, collections, loading, updateCollections } = useAuthContext();
  const cardsRef = useRef(null);
  const router = useRouter();

  const handleMouseMove = (e: MouseEvent) => {
    for (const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  const newCollection = async () => {
    const { data } = await createCollection();
    router.push("/collection/" + data._id);
  };

  useEffect(() => {
    updateCollections();
  }, []);

  useEffect(() => {
    const el: Element = cardsRef?.current;

    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);

    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={clsx(
        "mx-auto flex h-screen flex-col p-3",
        auth ? "container" : "w-full"
      )}
    >
      <Head>
        <title>SVGPS - Create your own icon collection</title>
      </Head>
      <Header />
      {!auth ? (
        <IconsProvider>
          <DragDropProvider>
            <div className="py-3">
              {!auth && <IconSetPreview isCollection />}
            </div>
          </DragDropProvider>
        </IconsProvider>
      ) : (
        <div
          ref={cardsRef}
          id="cards"
          className="mt-[200px] flex w-full flex-wrap items-center justify-center md:items-start md:justify-start"
        >
          {loading
            ? [1, 2, 3].map((i) => (
                <ContentLoader
                  viewBox="0 0 320 160"
                  width={320}
                  gradientDirection="top-bottom"
                  backgroundColor={"#262626"}
                  foregroundColor={"#404040"}
                  className="m-[10px]"
                >
                  <rect x="0" y="0" rx="12" ry="12" width="320" height="160" />
                </ContentLoader>
              ))
            : collections.map((collection) => (
                <CollectionCard
                  key={collection._id}
                  id={collection._id}
                  name={collection.name}
                  userAvatars={[auth.profilePicture]}
                  count={collection.icons?.split('"properties":').length - 1}
                />
              ))}
          <div
            className="m-[10px] h-40 w-80 cursor-pointer select-none overflow-hidden p-[1px]"
            onClick={newCollection}
          >
            <div className="h-40 rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800/20 text-neutral-500 transition-colors hover:border-neutral-600 hover:text-neutral-400">
              <div className="flex h-full w-full flex-col items-center justify-center">
                <Icon icon="close" className="mb-3 rotate-45" size={30}></Icon>
                <h2 className="mx-auto text-base font-medium">
                  Create New Collection
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
