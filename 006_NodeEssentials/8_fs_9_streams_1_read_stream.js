const fs = require("fs");

let data;

const stream = fs.createReadStream(
  "./8_fs_9_streams_1_read_stream_sample.md",
  "UTF-8"
);

stream.once("data", (chunk) => {
  console.log("Reading Chunks");
  console.log("\n ----------------- \n");
  console.log(chunk);
});

stream.on("data", (chunk) => {
  console.log(`chunk length ${chunk.length}`);
  data += chunk.length;
});

stream.on("end", (data) => {
  console.log(`finished reading ${data.length}`);
});
