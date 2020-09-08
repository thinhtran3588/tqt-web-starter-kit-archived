import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  logo: {
    height: theme.spacing(6),
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  linkButton: {
    padding: theme.spacing(2.25),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  flag: {
    height: theme.spacing(3),
  },
  lngFlag: {
    height: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
}));
