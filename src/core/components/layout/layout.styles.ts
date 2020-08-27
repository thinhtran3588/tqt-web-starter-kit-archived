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
  pageLinkButton: {
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  loginIcon: {
    color: '#fff',
  },
  flag: {
    height: theme.spacing(3),
  },
  langFlag: {
    height: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
}));
