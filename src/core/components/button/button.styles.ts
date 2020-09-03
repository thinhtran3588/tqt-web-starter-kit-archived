import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  default: {
    textTransform: 'none',
    borderRadius: theme.spacing(5),
    margin: theme.spacing(1, 0),
  },
}));
