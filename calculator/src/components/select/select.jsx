import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const {
    label, value, onChange, children: optionsArr,
  } = props;

  const renderedOptions = optionsArr.map((el) => (
    <option value={el} key={el}>{el}</option>
  ));

  return (
    <label className="form-group d-flex justify-content-between" htmlFor={value}>
      {label}
      <select
        className="w-50"
        value={value}
        id={value}
        onChange={onChange}
        tabIndex={0}
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
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Select;
