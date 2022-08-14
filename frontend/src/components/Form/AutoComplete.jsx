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
  defaultValue, label, name, data, isLoading, getOptionLabel,
  renderOption=null, control=null, width=null, ...props
}) {
  const _form = useFormContext();
  // const idValue = React.useState(null);

  if (control === undefined) {
    control = _form.control;
  }
  return (
    <>
      {isLoading === false ? (
      <Controller
        render={({ fieldState, formState, helperText, ...innerprops }) => (
          <Autocomplete
            {...innerprops}
            value={data.find((o) => {
              return o.id === innerprops.field.value || null;
            })}
            // id={name}
            // value={value}
            isOptionEqualToValue={(option, value) => {
              // console.log('option', option);
              // console.log('value', value);
              return option && value ? option.id === value.id : false;
            }}
            options={data}
            getOptionLabel={getOptionLabel}
            renderOption={renderOption}
            // getOptionSelected={(option, value) => value === undefined || value === '' || option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                // inputProps={{
                //   ...params.inputProps,
                //   autoComplete: 'disabled',
                // }}
              />
            )}
            onChange={(e, data) => {
              // console.log('onchange', data);
              return innerprops.field.onChange(data ? data.id : {});
            }}
            // value={value}
            sx={{ width: width ? width : '100%' }}
          />
        )}
        // onChange={([event, data]) => {
        //   console.log('DATATATATAT', data);
        //   return data;
        // }}
        // value={options.forEach(o => {

        //   return o.id;
        // })}
        name={name}
        control={control}
        // defaultValue={defaultValue}
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
  renderOption: PropTypes.func,
  getOptionLabel: PropTypes.func,
  defaultValue: PropTypes.any,
};
