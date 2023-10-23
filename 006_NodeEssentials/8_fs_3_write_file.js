const fs = require("fs");

const fileName = "8_fs_3_write_file_sample.md";

let md = `
    This is a new file
    ------------------

    ES6 Template honors white spaces.

    * Template Strings
    * Node File System
    * Readme CLIs
`;

fs.writeFile(fileName, md.trim(), (err) => {
  if (err) {
    throw err;
  }

  fs.appendFileSync(fileName, "\n\n ### NodeJS IS AWESOME ###");

  console.log("marked created");
});
