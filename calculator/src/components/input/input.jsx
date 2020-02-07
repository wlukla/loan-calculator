/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { label, value, onChange } = props;

  return (
    <label className="form-group d-flex justify-content-between">
      {label}
      <input
        className="w-50"
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
