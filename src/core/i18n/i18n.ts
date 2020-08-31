import type {GetStaticProps, GetStaticPaths} from 'next';

export const languages = ['vi', 'en'];
export const languageMap: {[lng: string]: {name: string; content: string}} = {
  vi: {name: 'Tiếng Việt', content: 'vi-VN'},
  en: {name: 'English', content: 'en-US'},
};

export const getStaticProps: GetStaticProps = async ({params}) => {
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
