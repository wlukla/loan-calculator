function trim(value: string): string {
  return value.replace(/_/g, '');
}

function trimWithSign(value: string): string {
  return value.slice(2).replace(/_/g, '');
}

export {
  trim, trimWithSign,
};
