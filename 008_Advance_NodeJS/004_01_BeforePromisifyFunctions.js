var delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} too long`));
  } else {
    setTimeout(() => {
      callback(null, `the ${seconds} is over`), seconds;
    });
  }
};

delay(4, (error, message) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log(message);
  }
});
