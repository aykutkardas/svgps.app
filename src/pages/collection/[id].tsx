import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";

import Header from "src/components/Header";
import { DragDropProvider } from "src/context/DragDropContext";
import CollectionPreview from "src/components/CollectionPreview";

const CollectionDetailPage = () => {
  const { query } = useRouter();

  const [collection, setCollection] = useState({
    collectionName: "",
    icons: [],
  });

  const getCollection = async () => {
    const session = JSON.parse(localStorage.session || "{}").token;
    if (!session) return;

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/collection",
      {
        params: { id: query.id },
        headers: { session },
      }
    );

    const icons = JSON.parse(data.icons.replace(/'/g, '"'));
    icons.forEach((icon) => {
      if (icon.__meta) {
        delete icon.__meta._selected;
      }
    });
    const collection = { collectionName: data.collectionName, icons };

    setCollection(collection);
  };

  useEffect(() => {
    if (!query.id) return;
    getCollection();
  }, [query.id]);

  const updateCollection = async () => {
    if (!collection.collectionName) return;

    const session = JSON.parse(localStorage.session || "{}").token;

    axios.put(
      process.env.NEXT_PUBLIC_API_URL + "/collection/update",
      {
        _id: query.id,
        collectionName: collection.collectionName,
        icons: JSON.stringify(collection.icons),
      },
      { headers: { session } }
    );
  };

  const handleUpdateIcons = (icons, type) => {
    setCollection({ ...collection, icons });
    if (type === "select") return;
    updateCollection();
  };

  return (
    <div className="mx-auto flex max-h-screen w-full flex-col py-3 px-3 md:px-8">
      <Head>
        <title>SVGPS - Create your own icon collection</title>
      </Head>
      <Header />
      <DragDropProvider>
        <div className="py-3">
          <CollectionPreview
            isCollection
            iconSet={{ icons: collection.icons }}
            update={handleUpdateIcons}
          />
        </div>
      </DragDropProvider>
    </div>
  );
};

export default CollectionDetailPage;
