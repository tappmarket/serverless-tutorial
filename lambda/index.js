/*
 * @Descripttion: []
 * @Copyright: Copyright by Iswoter
 * @Author: Iseven Monkey <iswoter@gmail.com>
 * @LastEditors: Iseven Monkey <iswoter@gmail.com>
 * @LastEditTime: 2022-08-15 17:09:11
 * @FilePath: /index.js
 */
"use strict";
exports.main_handler = async (event, context) => {
  console.log("Hello World");
  console.log("process.env", process.env);
  console.log(event);
  console.log(event["non-exist"]);
  console.log(context);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
        env: process.env,
      },
      null,
      2
    ),
  };
};

