import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function Datepicker({ defaultValue, label, control, name, width, ...props }) {
  const _form = useFormContext();

  if (control === undefined) {
    control = _form.control;
  }
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue ?? null}
        render={({ field: { onChange, value }, fieldState, ...props }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={onChange}
              label={label}
              value={value}
              renderInput={(params) => (
                <TextField
                  sx={{ width: width ? width : '100%' }}
                  {...params}
                  margin="normal"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState?.error?.message}
                />
              )}
              {...props}
            />
          </LocalizationProvider>
        )}

      />
    </>
  );
}
export default Datepicker;

Datepicker.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  defaultValue: PropTypes.any,
};
