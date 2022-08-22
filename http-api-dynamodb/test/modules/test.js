const axios = require("../lib/axios");
const utils = require("../lib/utils");
const globals = {};
describe(`Dynamodb test`, async function () {
  it(`Test create new item`, async function (done) {
    this.timeout(150000000);
    await axios
      .post(`create`, {
        text: new Date(),
      })
      .then((res) => {
        console.log("res:", res);
        done();
      });
  });
});
describe(`Dynamodb test`, async function () {
  it(`Test list all item`, async function (done) {
    this.timeout(150000000);
    await axios.get(`list`).then((res) => {
      console.log("res:", res);
      done();
    });
  });
});

