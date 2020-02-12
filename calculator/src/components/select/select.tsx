import React, { ReactChild } from 'react';
import { selectProps } from './types';

const Select = (props: selectProps) => {
  const {
    label, value, onChange, children: optionsArr,
  } = props;

  const renderedOptions: Array<ReactChild> = optionsArr.map((el) => (
    <option
      value={el}
      key={el}
    >
      {el}
    </option>
  ));

  return (
    <label
      className="form-group d-flex justify-content-between"
      htmlFor={value}
    >
      {label}
      <select
        className="w-50"
        value={value}
        id={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={0}
      >
        {renderedOptions}
      </select>
    </label>
  );
};

export default Select;
