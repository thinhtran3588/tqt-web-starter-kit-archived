/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import {useImmer} from 'use-immer';
import {useI18n} from 'next-localization';
import {useDispatch} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {AppError} from '@app/core/exceptions/app-error';
import type {Dispatch} from '@app/stores/store';

const Alert = (props: AlertProps): JSX.Element => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

export const GlobalError = (): JSX.Element => {
  const [errorState, setErrorState] = useImmer({open: false, message: ''});
  const {t} = useI18n();
  const {
    loading: {setLoading},
  } = useDispatch<Dispatch>();

  useEffect(() => {
    const handleError = (err: AppError): void => {
      const {code, messageCode, messageData, message} = err;

      setErrorState((draft) => {
        draft.open = true;
        draft.message = messageCode ? t(messageCode, messageData) : `${code}${message}` || t('common.unknownError');
      });

      // only record error if it's not app error
      if (err.name !== 'AppError') {
        // recordError(err);
      }
    };

    window.onerror = (_message, _source, _lineno, _colno, error) => {
      handleError(error as AppError);
    };
    const promiseErrorHandler = (event: PromiseRejectionEvent): void => {
      handleError(event.reason);

      setLoading(false);

      event.preventDefault();
    };
    window.addEventListener('unhandledrejection', promiseErrorHandler);
    return () => {
      window.removeEventListener('unhandledrejection', promiseErrorHandler);
    };
  }, [setErrorState, setLoading, t]);

  const close = (): void => {
    setErrorState((draft) => {
      draft.open = false;
    });
  };

  return (
    <Snackbar open={errorState.open} autoHideDuration={5000} onClose={close}>
      <Alert onClose={close} severity='error'>
        {errorState.message}
      </Alert>
    </Snackbar>
  );
};
