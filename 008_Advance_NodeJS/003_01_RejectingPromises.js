var delay = (seconds) =>
  new Promise((resolves, rejects) => {
    if (seconds > 3) {
      rejects(new Error(`${seconds} is too long`));
    }

    setTimeout(resolves("the long delay is ended"), seconds);
  });

delay(5)
  .then((input) => console.log(input))
  .then(() => 42)
  .then((number) => console.log("number passed in chain is: ", number))
  .catch((error) => console.log(error));

console.log("first tick ended");
