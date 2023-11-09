var { promisify } = require("util");

var delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} too long`));
  } else {
    setTimeout(() => {
      callback(null, `the ${seconds} is over`), seconds;
    });
  }
};

var promiseDelay = promisify(delay);

promiseDelay(5)
  .then(console.log())
  .catch((error) => console.log(`Error ${error.message}`));
