"use strict";
const Dynamodb = require("./lib/dynamodb");
const uuid = require("uuid");

module.exports.handle = async (event) => {
  console.log("process.env", process.env);
  const timestamp = new Date().toISOString();

  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);

    const params = {
      TableName: "table_dynamodb_stream_example_pong",
      Item: {
        id: uuid.v1(),
        eventID: record.eventID,
        eventName: record.eventName,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
    switch (record.eventName) {
      case "INSERT":
        params.Item.receivedData = record.dynamodb.NewImage;
        console.log("pingDB.NewImage:", record.dynamodb.NewImage);
        break;
      case "MODIFY":
        // TODO: operations
        break;
      case "REMOVE":
        // TODO: operations
        break;
    }
    await Dynamodb.put(params).promise();
  }
};

/* 
module.exports.handle = async (event) => {
  const records = event.Records;
  const timestamp = new Date().getTime();
  records.forEach(async (r) => {
    const eventName = r.eventName;
    const pingDB = r.dynamodb;
    console.log("<><><><><><><><><><><><><><><><><><><> eventName", eventName);
    console.log(pingDB);

    const params = {
      TableName: "table_dynamodb_stream_example_pong",

      Item: {
        id: uuid.v1(),
        eventName,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    switch (eventName) {
      case "INSERT":
        //   params.Item.receivedData = pingDB.NewImage;
        console.log("pingDB.NewImage:", pingDB.NewImage);
        break;
      case "MODIFY":
        // TODO: operations
        break;
      case "REMOVE":
        // TODO: operations
        break;
    }

    AWS.config.update({ region: process.env.AWS_REGION });
    Dynamodb.put(params, (error) => {
      if (error) {
        console.error("Pong put item error", error);
      }
    });
  });
};

 */

