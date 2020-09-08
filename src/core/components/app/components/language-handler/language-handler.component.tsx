/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import {useI18n} from 'next-localization';

export interface LanguageHanlderProps {
  lngDict: unknown;
  lng: string;
}

export const LanguageHanlder = (props: LanguageHanlderProps): JSX.Element => {
  const {lng, lngDict} = props;
  const i18n = useI18n();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (i18n.locale as any)(lng, lngDict);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, lngDict]);

  return <></>;
};
