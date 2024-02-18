import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import Header from "src/components/Header";
import CollectionPreview from "src/components/CollectionPreview";
import { deleteCollection, updateCollection } from "src/api/collection";
import { DragDropProvider } from "src/context/DragDropContext";
import { IconSetData } from "src/iconSets";
import useCollectionStore from "src/stores/collection";

const CollectionDetailPage = () => {
  const router = useRouter();
  const { query } = router;
  const { collections, setCollections } = useCollectionStore();

  const [collection, setCollection] = useState<Partial<IconSetData>>({
    name: "",
    icons: [],
  });

  useEffect(() => {
    if (!query.id) return;
    const collection = collections?.find((c) => c.id === query.id);
    if (!collection) return;
    setCollection({ ...collection, icons: JSON.parse(collection.icons) });
  }, [query.id, collections]);

  const handleUpdateCollection = async (collectionData) => {
    if (!collectionData.name) return;
    updateCollection(query.id, collectionData);
  };

  const handleDeleteCollection = async () => {
    if (!collection.name) return;
    deleteCollection(query.id);
    setCollections(collections.filter((c) => c.id !== query.id));
    router.push("/collection");
  };

  const handleUpdateIcons = (icons, type) => {
    setCollection({ ...collection, icons });
    if (type === "select") return;
    const localCollection = collections?.find((c) => c.id === query.id);
    if (!localCollection) return;
    localCollection.icons = JSON.stringify(icons);
    setCollections(collections);
    handleUpdateCollection({ ...collection, icons });
  };

  const handleUpdateCollectionName = (name) => {
    setCollection({ ...collection, name });
    handleUpdateCollection({ ...collection, name });
    setCollections(
      collections?.map((item) => ({
        ...item,
        name: item.id === query.id ? name : item.name,
      })) || [],
    );
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
