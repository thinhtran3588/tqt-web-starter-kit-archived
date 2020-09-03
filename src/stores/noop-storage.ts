/* eslint-disable @typescript-eslint/no-explicit-any */
interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}

export const createNoopStorage = (): Storage => ({
  getItem(_key) {
    return Promise.resolve(undefined);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem(_key) {
    return Promise.resolve();
  },
});
