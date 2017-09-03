import { Listener } from 'xstream';

const noop = () => {};
export const createDummyListener = <T>(): Partial<Listener<T>> => ({
  next: noop,
  error: noop,
  complete: noop
});
