import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Autocomplete, TextField, createFilterOptions } from '@mui/material';

const filter = createFilterOptions();
/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function AutoComplete({
  defaultValue, label, name, data, isLoading, getOptionLabel=null, inputName=null,
  control=null, width=null, ...props
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
              console.log('option', option);
              console.log('value', value);
              return (option && value) ? option.id === value.id || value.id === null : false;
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option[inputName]);
              if (inputValue !== '' && !isExisting) {
                const newInput = { inputValue };
                // newInput['inputValue'] = `Add "${inputValue}"`;
                newInput[inputName] = `Add "${inputValue}"`;
                newInput['id'] = null;
                filtered.push(newInput);
              }
              return filtered;
            }}
            options={data}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                console.log('STRING');
                return option;
              }
              if (option.inputValue) {
                console.log('inputval');
                return option.inputValue;
              }
              console.log('INPUTNAME');
              return option[inputName];
            }}
            // getOptionSelected={(option, value) => value === undefined || value === '' || option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                fullWidth
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // inputProps={{
                //   ...params.inputProps,
                //   autoComplete: 'disabled',
                // }}
              />
            )}
            onChange={(e, data) => {
              if (typeof data === 'string') {
                return data;
              } else if (data && data.inputValue) {
                return data.inputValue;
              } else {
                console.log('test', data);
                return innerprops.field.onChange(data ? data.id : {});
              }
            }}
            // value={value}
            sx={{
              width: width ? width : '100%',
              marginTop: '10px',
            }}
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
  inputName: PropTypes.any,
};
