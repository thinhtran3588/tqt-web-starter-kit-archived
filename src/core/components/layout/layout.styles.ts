import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((_theme) => ({
  root: {
    height: '100vh',
    flexDirection: 'column',
  },
  container: {
    flexGrow: 1,
  },
}));
