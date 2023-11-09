var fs = require("fs");
var { promisify } = require("util");
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var beep = () => process.stdout.write("\x07");
const fileName = "005_03_SequentialExecution_Promisify_Sample.txt";

var delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds * 1000);
  });

console.log("Files creation started");
Promise.all([
  writeFile("005_04_01.txt", "005_04_01 file"),
  writeFile("005_04_02.txt", "005_04_02 file"),
  writeFile("005_04_03.txt", "005_04_03 file"),
  writeFile("005_04_04.txt", "005_04_04 file"),
  writeFile("005_04_05.txt", "005_04_05 file"),
  writeFile("005_04_06.txt", "005_04_06 file"),
]).then(() => {
  console.log("Files creation completed");
  setTimeout(() => {
    console.log("Removal of files started");
    Promise.all([
      unlink("005_04_01.txt"),
      unlink("005_04_02.txt"),
      unlink("005_04_03.txt"),
      unlink("005_04_04.txt"),
      unlink("005_04_05.txt"),
      unlink("005_04_06.txt"),
    ]).then(() => {
      console.log("Removal of files completed");
    });
  }, 4000);
});
