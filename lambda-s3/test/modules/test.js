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

    const imgBuffer = await fs.createReadStream(path.resolve(__dirname, "../testFile/1.jpg"));
    const postFormData = new FormData();
    postFormData.append("attach", imgBuffer, "test.jpg");
    await axios.post(`upload`, postFormData, { "Content-type": "multipart/form-data" }).then(async (res) => {
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

