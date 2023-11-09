function hideString(str, done) {
  done(str.replace(/[a-zA-Z]/g, "X"));
}

hideString("Hello World", (response) => {
  console.log(response);
});

console.log("End");


