import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Layout} from '@app/core/components/layout/layout.component';

interface HomeScreenProps {}

export const HomeScreen = (_props: HomeScreenProps): JSX.Element => {
  const t = (key: string): string => key;
  return (
    <Layout title='Home'>
      <Typography variant='h6'>{t('common:home')}</Typography>
    </Layout>
  );
};
