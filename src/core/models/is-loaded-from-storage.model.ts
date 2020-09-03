import {createModel} from '@rematch/core';
import type {RootModel} from '@app/stores/models';

// default state
const state = false;

const setIsLoadedFromStorageCompleted = (_draft: boolean): boolean => {
  return true;
};

export const isLoadedFromStorage = createModel<RootModel>()({
  state,
  reducers: {
    setIsLoadedFromStorageCompleted,
  },
  effects: (_dispatch) => ({}),
});
