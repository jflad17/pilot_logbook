import React from 'react';
import escapeRegExp from 'lodash/escapeRegExp';
import { default as ReactSelect } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

/**
 * AutoComplete Component
 * @param {props} props props
 * @return {JSX}
 */
function AutoComplete({
  defaultValue, label, name, data, isLoading, setOptions, allowCreate=false, onChange=null, isMulti=false,
  renderOption=null, control=null, width=null, ...props
}) {
  const [inputValue, setInputValue] = React.useState('');
  const [_options, _setOptions] = React.useState([]);
  const _form = useFormContext();
  const _form2 = useForm();
  // const idValue = React.useState(null);

  if (control === undefined) {
    if (_form) {
      control = _form.control;
    } else {
      control = _form2.control;
    }
  }

  const errorStyle = (state, isInvalid) => {
    if (!isInvalid) return {};
    return {
      'borderColor': '#dc3545',
      ...(state.isFocused ? { boxShadow: '0 0 0 0.2rem rgb(220 53 69 / 25%)' } : {}),
      '&:hover': { ...(state.isFocused ? { boxShadow: '0 0 0 0.2rem rgb(220 53 69 / 25%)' } : {}) },
      'backgroundImage':
            `url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 
            width=%2712%27 height=%2712%27 fill=%27none%27 stroke=%27%23dc3545%27
            viewBox=%270 0 12 12%27%3e%3ccircle cx=%276%27 cy=%276%27 r=%274.5%27/%3e%3cpath
            stroke-linejoin=%27round%27 d=%27M5.8 3.6h.4L6 6.5z%27/%3e%3ccircle cx=%276%27
            cy=%278.2%27 r=%27.6%27 fill=%27%23dc3545%27 stroke=%27none%27/%3e%3c/svg%3e")`,
      'backgroundRepeat': 'no-repeat',
      'backgroundPosition': 'right calc(2.675rem) center',
      'backgroundSize': 'calc(0.75em + 0.375rem) calc(0.75em + 0.375rem)',
    };
  };

  const customStyles = (isValid) => {
    return {
      menu: (provided, state) => ({
        ...provided,
        marginTop: 2,
        zIndex: 6,
      }),
      control: (provided, state) => ({
        ...provided,
        ...errorStyle(state, isValid),
      }),
    };
  };


  React.useEffect(() => {
    if (!isLoading && data) {
      _setOptions(data.map((d) => setOptions(d)).filter((d) => d.value !== ''));
    }
  }, [data, isLoading, setOptions]);

  const _getSelectOption = React.useCallback(
      (value) => {
        let option = null;
        let val = null;
        if (Array.isArray(value)) {
          option = [];
          value.forEach((v) => {
            val = _options.find((o) => o.value === v);
            if (val === undefined) {
              val = { value: v, label: v, created: true };
            }
            option.push(val);
          });
        } else {
          val = _options.find((o) => o.value === value);
          if (value !== undefined && value !== null && value !== '' && val === undefined) {
            val = { value: value, label: value, created: true };
          }
          option = val;
        }

        if (option === undefined || option === null) {
          option = '';
        }
        return option;
      },
      [_options],
  );

  const style = {};
  if (props.width) {
    style.width = props.width;
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState, helperText, ...innerprops }) => {
          if (field.value === null || field.value === undefined) {
            field.onChange('');
          }
          return (
            <div className="position-relative" style={style}>
              <SelectControl
                allowCreate={allowCreate}
                styles={customStyles(Boolean(fieldState.error))}
                isLoading={isLoading}
                isClearable={false}
                value={_getSelectOption(field.value)}
                ignoreAccents={false}
                filterOption={() => true}
                onChange={(option) => {
                  let value = '';
                  if (!props.isMulti) {
                    value = option !== null ? option.value : null;
                  } else {
                    value = option.map((o) => o.value || o.label);
                  }
                  field.onChange(value || '');
                  if (onChange) onChange(value || '');
                }}
                onInputChange={(value) => setInputValue(value)}
                options={filteredOptions(_options, inputValue)}
                formatOptionLabel={formatOptionLabel}
                className={'react-select-container'}
                placeholder={isLoading ? 'Loading...' : label || ''}
                {...innerprops}
              />

              {Boolean(fieldState.error)? (
                <div className="invalid-tooltip" style={{ display: 'block' }}>
                  {fieldState.error?.message}
                </div>
              ) : null}
            </div>
          );
        }}
      />
    </>
  );
}

const SelectControl = (props) => (
  props.allowCreate === true ? <CreatableSelect {...props} /> : <ReactSelect {...props} />
);

const formatOptionLabel = ({ label, label2 }) => (
  <div style={{ display: 'flex' }}>
    <div>{label}</div>
    <div style={{ marginLeft: 'auto' }}>{label2}</div>
  </div>
);

const filteredOptions = (options, inputValue) => {
  if (!inputValue) {
    return options;
  }

  const matchByStart = [];
  const matchByInclusion = [];

  const regByInclusion = new RegExp(escapeRegExp(inputValue), 'i');
  const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, 'i');

  for (const options of options) {
    if (regByStart.test(option.label2)) {
      matchByStart.push(option);
      continue;
    }

    if (regByInclusion.test(option.label)) {
      if (regByStart.test(option.label)) {
        matchByStart.push(option);
      } else {
        matchByInclusion.push(option);
      }
    }
  }
  console.log('matchstart', matchByStart);

  return [...matchByStart, ...matchByInclusion];
};


export default AutoComplete;

AutoComplete.propTypes = {
  control: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  width: PropTypes.number,
  renderOption: PropTypes.func,
  setOptions: PropTypes.func,
  defaultValue: PropTypes.any,
  isMulti: PropTypes.bool,
  onChange: PropTypes.any,
  allowCreate: PropTypes.bool,
};

SelectControl.propTypes = {
  allowCreate: PropTypes.bool,
};
