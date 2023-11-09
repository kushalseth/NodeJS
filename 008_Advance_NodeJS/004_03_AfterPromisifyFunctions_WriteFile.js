var { promisify } = require("util");
var fs = require("fs");

var writeFile = promisify(fs.writeFile);

writeFile(
  "004_04_AfterPromisifyFunctions_WriteFile_Sample.txt",
  "This is sample."
)
  .then(() => console.log("file successfully created"))
  .catch((error) => console.log("error creating file"));
