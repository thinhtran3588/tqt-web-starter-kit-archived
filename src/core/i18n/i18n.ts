import type {GetStaticProps, GetStaticPaths} from 'next';

export const languages = ['en', 'vi'];
export const languageMap: {[lng: string]: {name: string; content: string}} = {
  vi: {name: 'Tiếng Việt', content: 'vi-VN'},
  en: {name: 'English', content: 'en-US'},
};

export const buildGetStaticProps = (namespaces: string[]): GetStaticProps => {
  return async (props) => {
    const {params} = props;
    const lngDict = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const namespace of namespaces) {
      // eslint-disable-next-line no-await-in-loop
      lngDict[namespace] = (await import(`./locales/${params.lng}/${namespace}.json`)).default;
    }

    return {
      props: {lng: params.lng, lngDict},
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1,
    };
  };
};

export const getStaticProps: GetStaticProps = async (props) => {
  const {params} = props;
  const {default: lngDict = {}} = await import(`./locales/${params.lng}.json`);

  return {
    props: {lng: params.lng, lngDict},
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: languages.map((l) => ({params: {lng: l}})),
    fallback: false,
  };
};
