import {createModel} from '@rematch/core';
import type {RootModel} from '@app/stores/models';

// default state
const state = true;

const setInternetConnection = (_draft: boolean, isConnected: boolean): boolean => {
  return isConnected;
};

export const internetConnection = createModel<RootModel>()({
  state,
  reducers: {
    setInternetConnection,
  },
  effects: (_dispatch) => ({}),
});
