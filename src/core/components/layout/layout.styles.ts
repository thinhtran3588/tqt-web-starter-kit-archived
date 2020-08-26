import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  pageLink: {
    marginRight: theme.spacing(3),
  },
  loginIcon: {
    color: '#fff',
  },
}));
