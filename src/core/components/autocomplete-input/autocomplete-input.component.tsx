/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {useI18n} from 'next-localization';
import TextField, {TextFieldProps} from '@material-ui/core/TextField';
import Autocomplete, {AutocompleteRenderOptionState} from '@material-ui/lab/Autocomplete';
import type {PickerDataItem} from '@app/core/interfaces/picker-data-item.interface';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export type AutocompleteInputProps = TextFieldProps & {
  autocompleteId?: string;
  autocompleteClassName?: string;
  renderOption?: (option: PickerDataItem, state: AutocompleteRenderOptionState) => React.ReactNode;
  dataSources: PickerDataItem[];
  errorMessage?: string;
};

export const AutocompleteInput = (props: AutocompleteInputProps): JSX.Element => {
  const {t} = useI18n();
  const {
    autocompleteId,
    autocompleteClassName,
    dataSources,
    errorMessage,
    disabled,
    renderOption,
    value,
    ...other
  } = props;
  const initialOption = dataSources.find((item) => item.value === value);
  return (
    <Box>
      <Autocomplete
        id={autocompleteId}
        options={dataSources}
        getOptionLabel={(option) => option.label}
        className={autocompleteClassName}
        disabled={disabled}
        autoHighlight
        renderInput={(params) => (
          <TextField aria-readonly={disabled} {...params} {...other} error={Boolean(errorMessage)} value={value} />
        )}
        renderOption={renderOption}
        noOptionsText={t('common.noOptions')}
        value={initialOption}
      />
      {Boolean(errorMessage) && (
        <Typography component='div' variant='caption' color={errorMessage ? 'error' : undefined}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};
