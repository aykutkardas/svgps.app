import api from "./index";

interface Response<T> {
  data?: T;
  error?: Record<string, unknown>;
}

export interface Collection {
  _id: string;
  name: string;
  icons: string;
}

export const getCollections = async (): Promise<Response<Collection[]>> => {
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
  error?: Record<string, unknown>;
}> => {
  try {
    const response = await api.get(`/collections/${id}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export const createCollection = async (): Promise<Response<Collection>> => {
  try {
    const response = await api.post("/collections", {
      name: "New Collection",
      icons: "[]",
    });
    return response;
  } catch (error) {
    return { error };
  }
};

export const deleteCollection = async (id: string | string[]) => {
  try {
    const response = await api.delete(`/collections/${id}`);
    return response;
  } catch (error) {
    return { error };
  }
};

export const updateCollection = async (
  id: string | string[],
  data: Partial<Collection>
): Promise<Response<Collection>> => {
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
