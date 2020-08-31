import React from 'react';
import Typography from '@material-ui/core/Typography';
import {getStaticPaths, getStaticProps} from '@app/core/i18n/i18n';
import {Layout} from '@app/core/components/layout/layout.component';

export const AboutScreen = (): JSX.Element => {
  return (
    <Layout title='About'>
      <Typography variant='h6'>About</Typography>
    </Layout>
  );
};

export {getStaticPaths, getStaticProps};
