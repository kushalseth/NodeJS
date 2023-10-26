const https = require("https");
const fs = require("fs");
const { error } = require("console");

const options = {
  hostname: "en.wikipedia.org",
  port: 443,
  path: "/wiki/Cher",
  method: "GET",
};

const request = https.request(options, (response) => {
  let responseBody = "";
  response.setEncoding("UTF-8");
  response.on("data", (chunk) => {
    console.log("----chunk", chunk.length);
    responseBody += chunk;
  });
  response.on("end", () => {
    fs.writeFile("001_HttpModule_Response.html", responseBody, (error) => {
      if (error) {
        throw error;
      }
      console.log("File Downloaded");
    });
  });
});

request.end();
