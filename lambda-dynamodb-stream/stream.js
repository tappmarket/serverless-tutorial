"use strict";

const Dynamodb = require("./lib/dynamodb");

module.exports.handle = async (event) => {
  const records = event.Records;
  records.forEach(async (r) => {
    const opType = r.eventName;
    const dynamodb = r.dynamodb;
    console.log("opType <><><><><><><><><><><><><><><><><><><>", opType);
    console.log(dynamodb);
    switch (opType) {
      case "INSERT":
        console.log("dynamodb.NewImage:", dynamodb.NewImage);

        break;
      case "MODIFY":
        // TODO: operations
        break;
      case "REMOVE":
        // TODO: operations
        break;
    }
  });
};

