var fs = require("fs");
var { promisify } = require("util");
var writeFile = promisify(fs.writeFile);
var unlink = promisify(fs.unlink);
var beep = () => process.stdout.write("\x07");
const fileName = "005_03_SequentialExecution_Promisify_Sample.txt";

var delay = (seconds) =>
  new Promise((resolves) => {
    setTimeout(resolves, seconds);
  });

const doStuffSequentially = async () => {
  console.log("starting");
  await delay(1);
  console.log("waiting");
  await delay(2);
  await writeFile(fileName, "Sample content");
  beep();
  console.log("file created");
  await delay(3);
  await unlink(fileName);
  beep();
  console.log("file removed");
  return Promise.resolve();
};

doStuffSequentially();
