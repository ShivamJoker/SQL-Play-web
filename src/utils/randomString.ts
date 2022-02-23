const randomString = (size: number = 10) => {
  const array = new Uint32Array(size);
  const values = window.crypto.getRandomValues(array);
  return values.toString();
};

export default randomString;
