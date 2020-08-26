import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Layout} from '@app/core/components/layout/layout.component';

export const HomeScreen = (): JSX.Element => {
  return (
    <Layout title='Home'>
      <Typography variant='h6'>Home</Typography>
    </Layout>
  );
};
