type selectProps = {
  label: string;
  value: string;
  children: Array<number>;
  onChange: onChange;
}

type onChange = {
  (val: string): void;
}

export {
  selectProps,
  onChange,
};
