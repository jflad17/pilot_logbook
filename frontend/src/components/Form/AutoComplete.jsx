import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';

/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function AutoComplete({
  defaultValue, label, name, data, isLoading, getOptionLabel, control=null, width=null, ...props
}) {
  const _form = useFormContext();

  if (control === undefined) {
    control = _form.control;
  }
  return (
    <>
      {isLoading === false ? (
      <Controller
        render={({ field: { onChange }, ...props }) => (
          <Autocomplete
            options={data}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => <TextField {...params} label={label} margin="normal" />}
            onChange={(e, data) => onChange(data)}
            sx={{ width: width ? width : '100%' }}
            {...props}
          />
        )}
        onChange={([, data]) => data}
        defaultValue={defaultValue}
        name={name}
        control={control}
      />
    ) : null}
    </>
  );
}
export default AutoComplete;

AutoComplete.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  width: PropTypes.number,
  getOptionLabel: PropTypes.func,
  defaultValue: PropTypes.any,
};
