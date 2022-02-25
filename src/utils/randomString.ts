const randomString = (size: number = 10) => {
  let result = '';
  for(let i = 0; i < size; i++) {
    const random = Math.random();
    result += String.fromCharCode(Math.floor(random * 26) + (random < .5 ? 65 : 97));
  }
  return result;
};

export default randomString;
