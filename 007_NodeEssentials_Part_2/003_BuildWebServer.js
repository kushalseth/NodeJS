const { createServer } = require("http");

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html>
        <body> 
            <h1> Hello World </h1> 
            <p> ${req.method} request made from ${req.url}. </p>
        </body>
    </html> 
  `);
}).listen(3000);

console.log("Webserver is running on 3000");
