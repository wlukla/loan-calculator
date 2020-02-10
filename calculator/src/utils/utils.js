function trim(value) {
  return value.replace(/_/g, '');
}

function trimWithSign(value) {
  return value.slice(2).replace(/_/g, '');
}

export {
  trim, trimWithSign,
};
