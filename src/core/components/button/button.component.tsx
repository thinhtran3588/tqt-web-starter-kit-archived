/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import ButtonBase, {ButtonProps} from '@material-ui/core/Button';
import {useStyles} from './button.styles';

const Button = (props: ButtonProps): JSX.Element => {
  const {variant = 'contained', color = 'primary', size = 'large', fullWidth = true, className, ...other} = props;
  const classes = useStyles();
  return (
    <ButtonBase
      variant={variant}
      color={color}
      className={clsx(classes.default, className)}
      size={size}
      fullWidth={fullWidth}
      {...other}
    />
  );
};

export {Button};
