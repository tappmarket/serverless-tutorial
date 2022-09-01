const assert = require("assert");

module.exports = {
  err(res, errorRegex) {
    assert.equal(res.response.status, 422);
    const actualError = res.response.data.errors.body[0];
    assert(errorRegex.test(actualError), `Expected: [${errorRegex}], Actual: [${actualError}]`);
  },

  randomString() {
    return ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
  },
  randomNumber(n = 10) {
    const chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let res = "";
    for (let i = 0; i < n; i++) {
      const index = Math.ceil(Math.random() * chars.length - 1);
      res += chars[index];
    }
    return res;
  },
  getArrayRadomNumer(arr) {
    if (!arr.length) {
      return null;
    }
    return Math.ceil(Math.random() * arr.length - 1);
  },
  delay,
};

function delay(time) {
  return new Promise((fulfill) => setTimeout(fulfill, time));
}

