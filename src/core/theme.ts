import {createMuiTheme} from '@material-ui/core/styles';
import {red, lightBlue} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[800],
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
