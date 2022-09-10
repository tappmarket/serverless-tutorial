"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: process.env.AWS_REGION,
    endpoint: "http://localhost:8000",
  };
  console.log("options", options);
}

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;

