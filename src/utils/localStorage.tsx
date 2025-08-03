import { useCallback, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newValue: T | ((prevValue: T) => T)) => void] {
  const getLocalStorage = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  }, [initialValue, key]);

  const [state, setState] = useState<T>(getLocalStorage());

  const setLocalStorage = useCallback(
    (newValue: T | ((prevValue: T) => T)): void => {
      setState((prevState) => {
        const newSetValue =
          newValue instanceof Function ? newValue(prevState) : newValue;

        window.localStorage.setItem(key, JSON.stringify(newSetValue));
        return newSetValue;
      });
    },
    [key]
  );

  return [state, setLocalStorage];
}
