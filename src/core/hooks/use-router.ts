import {useRouter as useNextRouter, NextRouter} from 'next/router';
import {useI18n} from 'next-localization';
import type {UrlObject} from 'url';
import config from '@app/core/config.json';

interface TransitionOptions {
  shallow?: boolean;
}
declare type Url = UrlObject | string;

export const useRouter = (): NextRouter => {
  const router = useNextRouter();
  const {locale} = useI18n();
  const lng = locale() || config.defaultLng;

  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */
  const push = async (url: Url, as?: Url, options?: TransitionOptions): Promise<boolean> => {
    return router.push(`/[lng]${url}`, `/${lng}${as || url}`, options);
  };
  return {...router, push};
};
