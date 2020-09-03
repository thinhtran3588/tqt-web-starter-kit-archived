/* eslint-disable react/jsx-props-no-spreading */
import React, {useState, useRef} from 'react';
import {useI18n} from 'next-localization';
import Box from '@material-ui/core/Box';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import {useStyles} from './text-input.styles';

export type TextInputProps = TextFieldProps & {
  errorMessage?: string;
  showClearButton?: boolean;
  alwaysShowClearButton?: boolean;
  defaultValue?: string;
  clear?: () => void;
  clearFocus?: boolean;
};

export const TextInput = (props: TextInputProps): JSX.Element => {
  const {
    value,
    type,
    error,
    errorMessage,
    disabled,
    showClearButton = true,
    alwaysShowClearButton = false,
    clear: clearInput,
    clearFocus = true,
    fullWidth = true,
    ...other
  } = props;
  const {t} = useI18n();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const clearButtonVisible = (showClearButton && Boolean(value)) || alwaysShowClearButton;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputEl = useRef<any>(undefined);

  const clear = (): void => {
    if (clearInput) {
      clearInput();
    }
    if (clearFocus) {
      setTimeout(() => inputEl.current.focus(), 100);
    }
  };

  return (
    <Box className={classes.container}>
      <TextField
        ref={inputEl}
        value={value}
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        error={error || Boolean(errorMessage)}
        InputProps={{
          readOnly: disabled,
        }}
        fullWidth={fullWidth}
        {...other}
      />
      {Boolean(errorMessage) && (
        <Typography component='div' variant='caption' color={errorMessage ? 'error' : undefined}>
          {errorMessage}
        </Typography>
      )}
      {!disabled && (
        <Box className={classes.iconContainer}>
          {type === 'password' && (
            <IconButton
              tabIndex={-1}
              className={classes.iconButton}
              onClick={() => setShowPassword(!showPassword)}
              title={t('common.showPassword')}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          )}
          {clearButtonVisible && (
            <IconButton tabIndex={-1} className={classes.iconButton} onClick={clear}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
};
