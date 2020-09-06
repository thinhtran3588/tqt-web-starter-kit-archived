import React, {useContext, useCallback} from 'react';
import {useImmer} from 'use-immer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, {Color} from '@material-ui/lab/Alert';

interface NotificationProviderProps {
  children?: React.ReactNode;
}

type Dispatch = (params: {message: string; type?: NotificationType}) => void;
export type NotificationType = Color;

export interface Notification {
  message: string;
  type?: NotificationType;
}

export interface NotificationState extends Notification {
  open: boolean;
}

const NotificationContext = React.createContext(undefined);
const LoadingDispatchContext = React.createContext<Dispatch>(undefined as never);

const NotificationProvider = (props: NotificationProviderProps): JSX.Element => {
  const {children} = props;
  const [notification, setNotification] = useImmer<NotificationState>({
    open: false,
    message: '',
    type: 'info',
  });

  const showNotification = useCallback(
    (params: Notification) => {
      setNotification((draft) => {
        draft.open = true;
        draft.message = params.message;
        draft.type = params.type || 'success';
      });
    },
    [setNotification],
  );

  const close = useCallback(() => {
    setNotification((draft) => {
      draft.open = false;
      draft.message = 'params.message';
      draft.type = 'success';
    });
  }, [setNotification]);

  return (
    <NotificationContext.Provider value={undefined}>
      <LoadingDispatchContext.Provider value={showNotification}>
        {children}
        <Snackbar open={notification.open} autoHideDuration={5000} onClose={close}>
          <Alert onClose={close} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      </LoadingDispatchContext.Provider>
    </NotificationContext.Provider>
  );
};

const useNotification = (): {showNotification: (params: Notification) => void} => {
  const showNotification = useContext(LoadingDispatchContext);
  return {showNotification};
};

export {NotificationProvider, useNotification};
