function isInputValid(...args) {
  return args.every((arg) => Boolean(arg));
}

export default isInputValid;
