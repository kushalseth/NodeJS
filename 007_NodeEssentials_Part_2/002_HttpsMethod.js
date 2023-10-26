const https = require("https");
const fs = require("fs");

const url = "https://en.wikipedia.org/wiki/Cher";

const request = https.get(url, (response) => {
  let download = fs.createWriteStream("002_HttpsMethod_Response.html");
  console.log("Respnse Started");
  response.pipe(download);
  response.on("end", () => {
    console.log("Response Finished");
  });
});

request.end();
