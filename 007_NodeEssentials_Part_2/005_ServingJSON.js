const { createServer } = require("http");
const data = require("./005_ServeringJSON_Data.json");

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/json" });

  if (req.url.toLowerCase() == "/biscuits") {
    let biscuits = data.filter((category) => category.name == "Biscuit");
    res.end(JSON.stringify(biscuits));
  }

  res.end(JSON.stringify(data));
}).listen(3000);
