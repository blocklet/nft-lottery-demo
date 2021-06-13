const { fromTokenToUnit, fromUnitToToken } = require('@ocap/util');

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const randomStr = str => `${str}${Math.floor(Math.random() * 1000000)}`;
const decimal = 18;

function lazyFunc(func) {
  let result;
  return () => {
    if (result !== undefined) {
      return result;
    }
    result = func();
    return result;
  };
}
function toBNStr(n) {
  return fromTokenToUnit(n, decimal).toString();
}
function fromBNStr(n) {
  return fromUnitToToken(n, decimal);
}

module.exports = {
  sleep,
  randomStr,
  lazyFunc,
  toBNStr,
  fromBNStr,
};
