import React from 'react';
import Typography from '@material-ui/core/Typography';
import {getStaticPaths, buildGetStaticProps} from '@app/core/i18n/i18n';
import {Layout} from '@app/core/components/layout/layout.component';

export const FormScreen = (): JSX.Element => {
  return (
    <Layout title='Form'>
      <Typography variant='h6'>Form</Typography>
    </Layout>
  );
};

const getStaticProps = buildGetStaticProps(['common', 'nav']);
export {getStaticPaths, getStaticProps};
