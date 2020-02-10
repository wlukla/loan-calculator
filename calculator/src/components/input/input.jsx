import React from 'react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

const Input = (props) => {
  const {
    label, value, onChange, error, mask,
  } = props;

  let errorMessage;

  if (error) {
    errorMessage = (
      <span className="alert-sm alert-warning">
        Value can&apos;t be greater than 25% MSRP
      </span>
    );
  }

  return (
    <label className="form-group d-flex justify-content-between" htmlFor={label}>
      {label}
      <div className="d-flex flex-column w-50">
        <InputMask
          mask={mask}
          maskPlaceholder=""
          alwaysShowMask
          className="w-100"
          type="text"
          value={value}
          onChange={onChange}
          id={label}
          tabIndex={0}
        />
        { errorMessage }
      </div>
    </label>
  );
};

Input.defaultProps = {
  error: false,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  mask: PropTypes.string.isRequired,
};

export default Input;
