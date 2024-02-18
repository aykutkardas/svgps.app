"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";

import Header from "src/components/Header";
import CollectionPreview from "src/components/CollectionPreview";
import { deleteCollection, updateCollection } from "src/api/collection";
import { DragDropProvider } from "src/context/DragDropContext";
import { IconSetData } from "src/iconSets";
import useCollectionStore from "src/stores/collection";

const CollectionDetailPage = () => {
  const router = useRouter();
  const params = useParams();

  const collectionId = params?.id as string;
  const { collections, setCollections } = useCollectionStore();

  const [collection, setCollection] = useState<Partial<IconSetData>>({
    name: "",
    icons: [],
  });

  useEffect(() => {
    if (!collectionId) return;
    const collection = collections?.find((c) => c.id === collectionId);
    if (!collection) return;
    setCollection({ ...collection, icons: JSON.parse(collection.icons) });
  }, [collectionId, collections]);

  const handleUpdateCollection = async (collectionData) => {
    if (!collectionData.name) return;
    updateCollection(collectionId, collectionData);
  };

  const handleDeleteCollection = async () => {
    if (!collection.name) return;
    deleteCollection(collectionId);
    setCollections(collections.filter((c) => c.id !== collectionId));
    router.push("/collection");
  };

  const handleUpdateIcons = (icons, type) => {
    setCollection({ ...collection, icons });
    if (type === "select") return;
    const localCollection = collections?.find((c) => c.id === collectionId);
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
        name: item.id === collectionId ? name : item.name,
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
