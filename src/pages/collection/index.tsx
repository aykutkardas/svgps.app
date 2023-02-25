import { useContext, useEffect, useRef } from "react";
import Head from "next/head";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import clsx from "clsx";
import { toast } from "react-hot-toast";

import Header from "src/components/Header";
import CollectionCard from "src/components/CollectionCard";
import Icon from "src/components/Icon";
import { useAuthContext } from "src/context/AuthContext";
import { IconsContext } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";
import { createCollection } from "src/api/collection";
import CollectionPreview from "src/components/CollectionPreview";

const CollectionPage = () => {
  const { auth, collections, loading, setCollections } = useAuthContext();
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
    const { data, error } = await createCollection();
    if (error) {
      toast.error(error?.response?.data[0].message);
      return;
    }
    setCollections([...collections, data]);
    router.push("/collection/" + data._id);
  };

  useEffect(() => {
    const el: Element = cardsRef?.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const collectionCount = collections?.length || 0;

  const { icons, setIcons } = useContext(IconsContext);

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
      {!auth && !loading ? (
        <DragDropProvider>
          <div className="py-3">
            {!auth && (
              <CollectionPreview iconSet={{ icons }} onUpdate={setIcons} />
            )}
          </div>
        </DragDropProvider>
      ) : (
        <div
          ref={cardsRef}
          id="cards"
          className="mt-[200px] flex h-[calc(100vh-200px)] flex-wrap justify-center"
        >
          {loading
            ? [1, 2, 3].map((i) => (
                <ContentLoader
                  key={i}
                  viewBox="0 0 320 160"
                  width={320}
                  height={158}
                  gradientDirection="top-bottom"
                  backgroundColor={"#262626"}
                  foregroundColor={"#404040"}
                  className="m-[10px]"
                >
                  <rect x="0" y="0" rx="12" ry="12" width="320" height="160" />
                </ContentLoader>
              ))
            : collections?.map((collection, index) => (
                <CollectionCard
                  key={collection?._id}
                  id={collection._id}
                  name={collection.name}
                  userAvatars={[auth.profilePicture]}
                  count={collection.icons?.split('"properties":').length - 1}
                />
              )) || null}
          {!loading &&
            new Array(3 - collectionCount).fill(0).map((n) => (
              <div
                key={n}
                role="button"
                tabIndex={-1}
                className="m-[10px] h-40 w-80 cursor-pointer select-none overflow-hidden p-[1px]"
                onClick={newCollection}
              >
                <div className="h-40 rounded-lg border-2 border-dashed border-neutral-700 bg-neutral-800/20 text-neutral-500 transition-colors hover:border-neutral-600 hover:text-neutral-400">
                  <div className="flex h-full w-full flex-col items-center justify-center">
                    <Icon
                      icon="close"
                      className="mb-3 rotate-45"
                      size={30}
                    ></Icon>
                    <h2 className="mx-auto text-base font-medium">
                      Create New Collection
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
