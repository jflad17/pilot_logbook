import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';

/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function AutoComplete({ defaultValue, label, data, name, value, isLoading, getOptionLabel, width=null, ...props }) {
  return (
    <>
      {isLoading === false ? (
          <Autocomplete
            options={data}
            getOptionLabel={getOptionLabel}
            renderInput={(params) => <TextField {...params} name={name} value={value} label={label} margin="normal" />}
            // onChange={(e, data) => onChange(data)}
            sx={{ width: width ? width : '100%' }}
            value={defaultValue ? data.find((d) => d.name === defaultValue) : null}
            {...props}
          />
    ) : null}
    </>
  );
}
export default AutoComplete;

AutoComplete.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  width: PropTypes.number,
  getOptionLabel: PropTypes.func,
  defaultValue: PropTypes.any,
};
