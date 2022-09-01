"use strict";
const moment = require("moment");
const AWS = require("aws-sdk");
const multipart = require("aws-lambda-multipart-parser");

const getEndPoint = () => {
  let url = `${process.env.S3_PROTOCOL}${process.env.S3_HOST}`;
  if (process.env.S3_PORT) {
    url += `:${process.env.S3_PORT}`;
  }
  return url;
};

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    s3ForcePathStyle: true,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    endpoint: new AWS.Endpoint(getEndPoint()),
  };
}

const s3Client = new AWS.S3(options);

module.exports.upload = async (event, context, callback) => {
  const file = multipart.parse(event, true).attach;
  if (!file || !["image/png", "image/jpg", "image/jpeg", "image/gif"].includes(file.contentType)) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        error: "It is node a image file!",
      }),
    });
    return;
  }

  const ext = file.contentType.replace("image/", "");
  const fileKey = `uploads/${moment().toISOString()}.${ext}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: file.content,
  };

  const res = await s3Client
    .putObject(params)
    .promise()
    .catch((err) => {
      console.log(err, err.stack);
    });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      path: `${getEndPoint()}/${process.env.S3_BUCKET_NAME}/${fileKey}`,
    }),
  };

  callback(null, response);
};

module.exports.list = async (event, context, callback) => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
    };

    const s3Objects = await s3Client.listObjectsV2(params).promise();
    console.log("s3Objects:", s3Objects.Contents);
    const files = [];
    if (s3Objects && s3Objects.Contents.length) {
      s3Objects.Contents.forEach((item) => {
        item.url = `${getEndPoint()}/${process.env.S3_BUCKET_NAME}/${item.Key}`;
        files.push(item);
      });
    }
    console.log("files", files);
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(files),
    };
    callback(null, response);
  } catch (e) {
    console.log(e);
    // create a response
    const response = {
      statusCode: 500,
      body: JSON.stringify(e),
    };
    callback(null, response);
  }
};

