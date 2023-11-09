var delay = (seconds) =>
  new Promise((resolves, rejects) => {
    setTimeout(resolves("the long delay is ended"), seconds);
  });

delay(1)
  .then((input) => {
    console.log(input);
  })
  .then(() => {
    console.log("it's a chain");
    return 42;
  })
  .then((number) => {
    console.log("number passed in chain is: ", number);
  });

console.log("first tick ended");
