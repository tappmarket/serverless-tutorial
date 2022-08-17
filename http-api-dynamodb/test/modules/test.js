const axios = require("../lib/axios");
const utils = require("../lib/utils");
const globals = {};
describe(`Dynamodb test`, () => {
  it(`Test create new item`, (done) => {
    axios
      .post(`create`, {
        text: new Date(),
      })
      .then((res) => {
        console.log("res:", res);
        done();
      });
  });
});

describe(`Dynamodb test`, () => {
  it(`Test list all item`, (done) => {
    axios.get(`list`).then((res) => {
      console.log("res:", res);
      done();
    });
  });
});

