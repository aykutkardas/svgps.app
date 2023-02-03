import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Header from "src/components/Header";
import { DragDropProvider } from "src/context/DragDropContext";
import CollectionPreview from "src/components/CollectionPreview";
import {
  deleteCollection,
  getCollection,
  updateCollection,
} from "src/api/collection";

const CollectionDetailPage = () => {
  const router = useRouter();
  const { query } = router;

  const [collection, setCollection] = useState({
    name: "",
    icons: [],
  });

  const fetchCollection = async () => {
    const { data } = await getCollection(query.id);

    const icons = JSON.parse(data.icons);

    icons.forEach((icon) => {
      if (!icon.__meta) return;
      delete icon.__meta._selected;
    });

    const collection = {
      name: data.name,
      icons,
    };

    setCollection(collection);
  };

  const handleUpdateCollection = async (collectionData) => {
    if (!collectionData.name) return;
    updateCollection(query.id, collectionData);
  };

  const handleDeleteCollection = async () => {
    if (!collection.name) return;
    deleteCollection(query.id);
    router.push("/collection");
  };

  useEffect(() => {
    if (!query.id) return;
    fetchCollection();
  }, [query.id]);

  const handleUpdateIcons = (icons, type) => {
    setCollection({ ...collection, icons });
    if (type === "select") return;
    handleUpdateCollection({ ...collection, icons });
  };

  const handleUpdateCollectionName = (name) => {
    setCollection({ ...collection, name });
    handleUpdateCollection({ ...collection, name });
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
            data={collection}
            iconSet={{ icons: collection.icons }}
            onRename={handleUpdateCollectionName}
            onUpdate={handleUpdateIcons}
            onDelete={handleDeleteCollection}
          />
        </div>
      </DragDropProvider>
    </div>
  );
};

export default CollectionDetailPage;
