import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

import { Switch, FormControlLabel, FormGroup } from '@mui/material';


/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function Switcher({ defaultValue, label, control, name, width, ...props }) {
  const _form = useFormContext();

  if (control === undefined) {
    control = _form.control;
  }
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ?? null}
      render={({ field: { onChange, value }, fieldState, ...props }) => (
        <FormGroup>
          <FormControlLabel
            label={label}
            control={
              <Switch
                // sx={{ width: width ? width : '100%' }}
                onChange={onChange}
                value={value}
                margin="normal"
                error={Boolean(fieldState.error)}
                helperText={fieldState?.error?.message}
                {...props}
              />}
          />
        </FormGroup>
      )}
    />
  );
}
export default Switcher;

Switcher.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.number,
  defaultValue: PropTypes.string,
};
