type inputProps = {
  label: string;
  value: string;
  error: boolean;
  mask: string;
  onChange: onChange;
}

type onChange = {
  (val: string): void;
}

export {
  inputProps,
  onChange,
};
