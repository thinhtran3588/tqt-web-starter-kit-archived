import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  flag: {
    height: theme.spacing(3),
  },
  lngFlag: {
    height: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
}));
