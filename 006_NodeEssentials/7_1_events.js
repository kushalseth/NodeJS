const events = require("events");

let emitter = new events.EventEmitter();

const eventName = "customeEvent";

// creating a custom event
// subcriber or listeners
emitter.on(eventName, (message, user) => {
  console.log(`${user}: ${message}`);
});

// publishing the event.
emitter.emit(eventName, "Hello World", "Computer");

emitter.emit(eventName, "That's preitty cool", "Kushal");

process.stdin.on("data", (data) => {
  const input = data.toString().trim();
  if (input == "exit") {
    emitter.emit(eventName, "Good bye!!", "Process");
    process.exit();
  }
  emitter.emit(eventName, data.toString().trim(), "Terminal");
});
