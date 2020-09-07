/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import clsx from 'clsx';
import {FormikContextType} from 'formik';
import {TextInput, TextInputProps} from '../text-input/text-input.component';
import {AutocompleteInput, AutocompleteInputProps} from '../autocomplete-input/autocomplete-input.component';
import {useStyles} from './form-input.styles';

export type FormField<Values> = (
  | (TextInputProps & {fieldType: 'text'})
  | (AutocompleteInputProps & {fieldType: 'autocomplete'})
) & {
  fieldName?: keyof Values;
};

export type FormInputProps<Values> = {
  field: FormField<Values>;
  form?: FormikContextType<Values>;
};

type FormInput = <FormData>(props: FormInputProps<FormData>) => JSX.Element;

export const FormInput: FormInput = (props) => {
  const {form, field} = props;
  const {fieldType = 'text', fieldName, ...other} = field;
  const classes = useStyles();
  const extendedProps = {
    onChange: form && fieldName ? form.handleChange(fieldName) : undefined,
    onChangeValue: form && fieldName ? (val?: unknown) => form.setFieldValue(fieldName as string, val) : undefined,
    errorMessage: form && fieldName ? form.errors[fieldName] : '',
    value: form && fieldName ? form.values[fieldName] : undefined,
  };

  switch (fieldType) {
    case 'autocomplete': {
      const autocompleteInputProps = other as AutocompleteInputProps;
      return (
        <AutocompleteInput
          {...autocompleteInputProps}
          className={clsx(classes.default, autocompleteInputProps.className)}
          value={autocompleteInputProps.value || ((extendedProps.value as unknown) as string)}
          onChange={autocompleteInputProps.onChange || extendedProps.onChange}
          errorMessage={autocompleteInputProps.errorMessage || (extendedProps.errorMessage as string)}
        />
      );
    }
    default: {
      const textProps = other as TextInputProps;
      return (
        <TextInput
          {...textProps}
          className={clsx(classes.default, textProps.className)}
          value={textProps.value || ((extendedProps.value as unknown) as string)}
          onChange={textProps.onChange || extendedProps.onChange}
          errorMessage={textProps.errorMessage || (extendedProps.errorMessage as string)}
          clear={() => form.setFieldValue(fieldName as string, '')}
        />
      );
    }
  }
};
