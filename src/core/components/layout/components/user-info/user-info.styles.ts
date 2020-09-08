import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  profile: {
    display: 'flex',
    flexDirection: 'row',
    '&:hover': {
      cursor: 'pointer',
    },
    padding: theme.spacing(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTitle: {
    marginRight: theme.spacing(1),
  },
}));
