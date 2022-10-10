import { useEffect, useCallback } from "react";

const useDebounce = (effect, dependencies, delay) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};

export default useDebounce;
