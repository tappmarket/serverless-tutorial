const axios = require("../lib/axios");
const utils = require("../lib/utils");
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");

const globals = {};
describe(`s3 test`, async function () {
  it(`Test put file to buket`, async function () {
    //  this.timeout(1500000);

    const imgBase64 = await fs.readFileSync(path.resolve(__dirname, "../testFile/1.jpg"), "base64");

    await axios
      .post(`upload`, {
        image: imgBase64,
      })
      .then(async (res) => {
        console.log("res:", res);
        //assert.equal(res, "path");
      });
  });
});

describe(`s3 test`, async function () {
  it(`Test list all item`, async function () {
    // this.timeout(150000000);
    await axios.get(`list`).then((res) => {
      console.log("res:", res);
    });
  });
});

