"use strict";
const Dynamodb = require("./lib/dynamodb");
const uuid = require("uuid");

module.exports.handle = async (event) => {
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

