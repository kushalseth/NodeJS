import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

let messages = [];

wss.on("connection", (ws) => {
  // ws is context client.
  ws.on("message", (message) => {
    console.log(message.toString());
    messages.push(message.toString());
    if (message.toString() == "exit") {
      ws.close();
    } else {
      wss.clients.forEach((client) => {
        // sending messages to all the clients
        client.send(message.toString);
      });
    }
  });

  ws.on("close", () => {
    console.log("user disconnected");
  });
  console.log("new socket connected");

  ws.send("Welcome to Live Chat");

  if (messages.length) {
    ws.send("Chat currently in progress");
    messages.send((message) => {
      ws.send(message.toString());
    });
  }
});

console.log("chat server waiting for connection on ws://localhost:3000");
