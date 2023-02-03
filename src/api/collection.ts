import api from "./index";

export interface Collection {
  _id: string;
  name: string;
  icons: string;
}

export const getCollections = async (): Promise<{
  data?: Collection[];
  error?: any;
}> => {
  try {
    const response = await api.get("/collections");
    return response;
  } catch (error) {
    return { error };
  }
};

export const getCollection = async (
  id: string | string[]
): Promise<{
  data?: Collection;
  error?: any;
}> => {
  try {
    const response = await api.get(`/collections/${id}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export const createCollection = async (): Promise<{ data: Collection }> => {
  try {
    const response = await api.post("/collections", {
      name: "New Collection",
      icons: "[]",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteCollection = async (id: string | string[]) => {
  try {
    const response = await api.delete(`/collections/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateCollection = async (
  id: string | string[],
  data: Partial<Collection>
): Promise<{ data: Collection }> => {
  try {
    const response = await api.put(`/collections/${id}`, {
      ...data,
      icons: JSON.stringify(data.icons),
    });
    return response;
  } catch (error) {
    return error;
  }
};
