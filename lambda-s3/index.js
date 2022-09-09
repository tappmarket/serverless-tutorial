"use strict";
const moment = require("moment");
const AWS = require("aws-sdk");

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
  console.log("process.env", process.env);
  const body = JSON.parse(event.body);
  if (!body.image) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        error: "base64 image data not found!",
      }),
    });
    return;
  }

  const fileInfo = base64FileInfo(body.image);

  if (!fileInfo) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        error: "It is not a image file!",
      }),
    });
    return;
  }

  const base64Data = body.image.replace(/^data:image\/\w+;base64,/, "");
  const dataBuffer = Buffer.from(base64Data, "base64");

  const fileKey = `uploads/${moment().toISOString()}.${fileInfo.ext}`;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileKey,
    Body: dataBuffer,
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
      path: `${getUrlFromBucket()}/${fileKey}`,
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

    const files = [];
    if (s3Objects && s3Objects.Contents.length) {
      s3Objects.Contents.forEach((item) => {
        item.url = `${getUrlFromBucket()}/${item.Key}`;
        files.push(item);
      });
    }
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

function base64FileInfo(fileBase64) {
  const fileHeader = new Map();
  //get the first 3 char of base64
  fileHeader.set("/9j", {
    ext: "jpg",
    type: "images/jpeg",
  });
  fileHeader.set("iVB", {
    ext: "png",
    type: "images/png",
  });
  fileHeader.set("Qk0", {
    ext: "bmp",
    type: "image/bmp",
  });
  fileHeader.set("SUk", {
    ext: "tiff",
    type: "image/tiff",
  });
  fileHeader.set("JVB", {
    ext: "pdf",
    type: "application/pdf",
  });
  fileHeader.set("UEs", {
    ext: "ofd",
    type: "application/ofd",
  });

  let res = {};

  fileHeader.forEach((v, k) => {
    if (k == fileBase64.substr(0, 3)) {
      res = v;
    }
  });

  //if file is not supported
  if (!res.ext) {
    return null;
  }

  //return map value
  return res;
}

function getUrlFromBucket() {
  /*   process.env 
      S3_DIRECTORY: './s3-local',
      S3_PORT: '8000',
      S3_BUCKET_NAME: 'lambda-s3-example-local',
      S3_HOST: 'localhost',
      S3_PROTOCOL: 'http://',
      ACCESS_KEY_ID: 'S3RVER',
      SECRET_ACCESS_KEY: 'S3RVER',
      AWS_REGION: 'eu-west-1',
    */
  const bucket = process.env.S3_BUCKET_NAME;
  if (process.env.IS_OFFLINE) {
    return `${getEndPoint()}/${bucket}`;
  } else {
    const region = process.env.AWS_REGION;
    const regionString = region.includes("us-east-1") ? "" : "-" + region;
    return `https://${bucket}.s3${regionString}.amazonaws.com`;
  }
}

