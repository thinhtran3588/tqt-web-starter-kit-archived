import React from 'react';
import Typography from '@material-ui/core/Typography';
import {withTranslation} from '@app/core/i18n';
import {Layout} from '@app/core/components/layout/layout.component';
import {TFunction} from 'next-i18next';

interface HomeScreenProps {
  t: TFunction;
}

export const HomeScreenBase = (props: HomeScreenProps): JSX.Element => {
  const {t} = props;
  return (
    <Layout title='Home'>
      <Typography variant='h6'>{t('common:home')}</Typography>
    </Layout>
  );
};
HomeScreenBase.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export const HomeScreen = withTranslation('common')(HomeScreenBase);
