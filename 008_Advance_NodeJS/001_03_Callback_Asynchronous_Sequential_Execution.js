function delay(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}

console.log("Delays Configured");

// callback hell or pyramid of droom 
delay(2, (response) => {
  console.log("Delay of 2 seconds");
  delay(1, (response) => {
    console.log("Delay of 3 seconds");
    delay(1, (response) => {
      console.log("Delay of 4 seconds");
      delay(1, (response) => {
        console.log("Delay of 5 seconds");
        delay(1, (response) => {
          console.log("Delay of 6 seconds");
          delay(1, (response) => {
            console.log("Delay of 7 seconds");
            delay(1, (response) => {
              console.log("Delay of 8 seconds");
              delay(1, (response) => {
                console.log("Delay of 9 seconds");
                delay(1, (response) => {
                  console.log("Result");
                });
              });
            });
          });
        });
      });
    });
  });
});
