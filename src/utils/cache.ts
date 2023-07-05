import { IconSetItem } from "src/types";

const setCache = (key: string, value: IconSetItem[]) => {
  if (!window.$iconSetCache) {
    window.$iconSetCache = new Map();
  }
  window.$iconSetCache.set(key, value);
};

const getCache = (key: string) => window.$iconSetCache?.get(key) || [];

export default {
  get: getCache,
  set: setCache,
};
