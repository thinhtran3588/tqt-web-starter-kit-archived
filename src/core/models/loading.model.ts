import {createModel} from '@rematch/core';
import type {RootModel} from '@app/stores/models';

// default state
const state = false;

const setLoading = (_draft: boolean, showLoading: boolean): boolean => {
  return showLoading;
};

export const loading = createModel<RootModel>()({
  state,
  reducers: {
    setLoading,
  },
  effects: (_dispatch) => ({}),
});
