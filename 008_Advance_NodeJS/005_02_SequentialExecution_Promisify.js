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

const doStuffSequentially = () =>
  Promise.resolve()
    .then(() => console.log("starting"))
    .then(() => delay(1))
    .then(() => console.log("waiting"))
    .then((message) => console.log(message))
    .then(() => delay(2))
    .then(() => writeFile(fileName, "Sample content"))
    .then(beep)
    .then(() => "file created")
    .then(console.log)
    .then(() => delay(3))
    .then(() => unlink(fileName))
    .then(beep)
    .then(() => `${fileName} removed`)
    .then(console.log)
    .catch((error) => console.error(error));

doStuffSequentially();
