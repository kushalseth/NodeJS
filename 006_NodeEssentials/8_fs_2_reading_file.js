const fs = require("fs");

fs.readFile("./8_fs_2_reading_file_sample.md", "UTF-8", (err, content) => {
  if (err) {
    throw err;
  }
  console.log(content);
});

console.log("reading the file");
