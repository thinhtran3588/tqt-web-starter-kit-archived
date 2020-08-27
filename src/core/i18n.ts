import NextI18Next from 'next-i18next';
import path from 'path';

export const i18n = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['vi'],
  localeSubpaths: {
    vi: 'vi',
  },
  localePath: path.resolve('./public/static/locales'),
});

export const {withTranslation, Link, appWithTranslation} = i18n;
