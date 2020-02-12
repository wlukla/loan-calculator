import React, { ReactChild } from 'react';
import InputMask from 'react-input-mask';
import { inputProps } from './types';

const Input = (props: inputProps) => {
  const {
    label, value, onChange, error, mask,
  } = props;

  let errorMessage: ReactChild;

  if (error) {
    errorMessage = (
      <span className="alert-sm alert-warning">
        Value can&apos;t be greater than 25% MSRP
      </span>
    );
  }

  return (
    <label
      className="form-group d-flex justify-content-between"
      htmlFor={label}
    >
      {label}
      <div className="d-flex flex-column w-50">
        <InputMask
          mask={mask}
          alwaysShowMask
          className="w-100"
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
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

export default Input;
