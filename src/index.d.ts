declare module 'next-localization' {
  export function useI18n(): {
    t: (key: string, params?: {[id: string]: unknown}) => string;
    locale: () => string;
  };

  export function I18nProvider(props: {children?: React.ReactNode; lngDict: unknown; locale: string}): JSX.Element;
}
