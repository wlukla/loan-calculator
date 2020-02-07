/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const {
    label, value, onChange, optionsArr,
  } = props;

  const renderedOptions = optionsArr.map((el) => (
    <option value={el} key={el}>{el}</option>
  ));

  return (
    <label className="form-group d-flex justify-content-between">
      {label}
      <select
        className="w-50"
        value={value}
        onChange={onChange}
      >
        {renderedOptions}
      </select>
    </label>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  optionsArr: PropTypes.instanceOf(Array).isRequired,
};

export default Select;
