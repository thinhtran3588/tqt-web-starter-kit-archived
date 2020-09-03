import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(1, 6),
  },
  socialIcon: {
    height: theme.spacing(5),
    fontSize: theme.spacing(5),
  },
}));
