const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

let password = '1min';

function generateStrings(length, callback) {
  const generate = (prefix) => {
    if (prefix.length === length) {
      callback(prefix);
      if (prefix === password) {
        return true;
      }
      return false;
    }
    for (let i = 0; i < chars.length; i++) {
      if (generate(prefix + chars[i])) {
        return true;
      }
    }
    return false;
  };
  generate('');
}

generateStrings(4, (combination) => {
  console.log(combination);
  if (combination === password) {
    console.log('found the password ' + password);
    return;
  }
});
