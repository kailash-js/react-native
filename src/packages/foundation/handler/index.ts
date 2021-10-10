import {useRef, useEffect} from 'react';

export const createStaticHandler = <T>(): T => {
  return {} as T;
};

export const useHandler = <T>(): T => {
  const _handler = useRef({});
  return _handler.current as T;
};

export const useExposeHandler = <T>(
  handler: any,
  methods: T,
  dependency: any[] = [],
) => {
  useEffect(() => {
    if (handler) {
      Object.assign(handler, methods);
    }
    return () => {
      if (handler) {
        Object.assign(handler, {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependency);
};
