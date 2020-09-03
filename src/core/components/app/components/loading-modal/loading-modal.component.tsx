import React from 'react';
import {useSelector} from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import type {RootState} from '@app/stores/store';
import {useStyles} from './loading-modal.styles';

export const LoadingModal = (): JSX.Element => {
  const classes = useStyles();
  const loading = useSelector((state: RootState) => state.loading);
  return (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};
