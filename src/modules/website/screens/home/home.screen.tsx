import React from 'react';
import {useI18n} from 'next-localization';
import Typography from '@material-ui/core/Typography';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import {Layout} from '@app/core/components/layout/layout.component';

interface HomeScreenProps {}

export const HomeScreen = (_props: HomeScreenProps): JSX.Element => {
  const {t} = useI18n();
  return (
    <Layout title='Home' description='Home page'>
      <Typography variant='h6'>{t('common.home')}</Typography>
    </Layout>
  );
};

export {getStaticPaths, getStaticProps};
