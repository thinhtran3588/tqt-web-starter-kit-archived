import {init, RematchDispatch, RematchRootState, RematchStore} from '@rematch/core';
import immerPlugin from '@rematch/immer';
import persistPlugin from '@rematch/persist';
import {persistStore} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import {models, RootModel} from './models';
import {createNoopStorage} from './noop-storage';

export type Store = RematchStore<RootModel>;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['isLoadedFromStorage', 'settings', 'auth'],
  version: 1,
};

export const store: Store = init<RootModel>({
  models,
  plugins: [immerPlugin(), persistPlugin(persistConfig)],
});

export const persistor = persistStore(store, undefined, () => {
  if (!store.getState().isLoadedFromStorage) {
    store.dispatch.isLoadedFromStorage.setIsLoadedFromStorageCompleted();
  }
});
