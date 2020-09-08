import {createModel} from '@rematch/core';
import type {RootModel} from '@app/stores/models';
import {config} from '../config';

export interface SettingsState {
  language: string;
  theme: 'dark' | 'light';
}

// default state
const state: SettingsState = {
  language: config.defaultLng,
  theme: 'light',
};

const setLanguage = (draft: SettingsState, language: string): SettingsState => {
  draft.language = language;
  return draft;
};

const setTheme = (draft: SettingsState, theme: 'dark' | 'light'): SettingsState => {
  draft.theme = theme;
  return draft;
};

export const settings = createModel<RootModel>()({
  state,
  reducers: {
    setLanguage,
    setTheme,
  },
  effects: (_dispatch) => ({}),
});
