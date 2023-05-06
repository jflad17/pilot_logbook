import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

import { TextField } from '@mui/material';


/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function Input({ type, defaultValue, label, name, autoComplete=null, control=null, width=null, ...props }) {
  const _form = useFormContext();
  if (defaultValue === undefined) {
    if (type === 'number') {
      defaultValue = 0;
    } else {
      defaultValue = '';
    }
  }
  if (control === undefined) {
    control = _form.control;
  }
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          // console.log('value', (value !== undefined && value !== null) ? value : defaultValue);
          return (
            <TextField
              {...field}
              sx={{ width: width ? width : '100%' }}
              autoComplete={autoComplete}
              label={label}
              type={type}
              // value={value !== undefined ? value : type === 'number' ? 0 : ''}
              // value={(value !== undefined && value !== null) ? value : defaultValue}
              margin="normal"
              error={Boolean(fieldState.error)}
              helperText={fieldState?.error?.message}
            />);
        }}
      />
    </>
  );
}
export default Input;

Input.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  defaultValue: PropTypes.any,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
};
