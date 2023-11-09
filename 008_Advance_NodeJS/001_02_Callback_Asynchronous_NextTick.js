function hideString(str, done) {
  process.nextTick(() => {
    done(str.replace(/[a-zA-Z]/g, "X"));
  });
}

hideString("Hello World", (response) => {
  console.log(response);
});

console.log("End");
