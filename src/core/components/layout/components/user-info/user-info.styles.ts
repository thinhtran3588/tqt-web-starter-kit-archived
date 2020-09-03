import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  linkButton: {
    padding: theme.spacing(2.5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      cursor: 'pointer',
    },
    padding: theme.spacing(2.5),
  },
  userTitle: {
    marginRight: theme.spacing(1),
  },
}));
