import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(2),
  },
  iconButton: {
    marginLeft: theme.spacing(1),
  },
}));
