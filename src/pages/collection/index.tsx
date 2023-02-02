import Head from "next/head";

import Header from "src/components/Header";
import { IconsProvider } from "src/context/IconsContext";
import { DragDropProvider } from "src/context/DragDropContext";
import IconSetPreview from "src/components/IconSetPreview";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import CollectionCard from "src/components/CollectionCard";

const CollectionPage = () => {
  const { auth } = useAuthContext();

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!auth) return;
    const session = JSON.parse(localStorage.session || "{}").token;
    fetch(process.env.NEXT_PUBLIC_API_URL + "/collections", {
      headers: {
        session,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCollections(data);
      });
  }, [auth]);

  return (
    <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
      <Head>
        <title>SVGPS - Create your own icon collection</title>
      </Head>
      <Header />
      <IconsProvider>
        <DragDropProvider>
          <div className="py-3">{!auth && <IconSetPreview isCollection />}</div>
        </DragDropProvider>
      </IconsProvider>
      <div className="flex h-[calc(100vh-5rem)] w-full items-center justify-center">
        {auth &&
          collections.map((collection) => (
            <CollectionCard
              name={collection.collectionName}
              count={collection.icons.split('"properties":').length - 1}
              id={collection._id}
            />
          ))}
      </div>
    </div>
  );
};

export default CollectionPage;
