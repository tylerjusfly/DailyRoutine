const http = require("http");
const app = require("./app.js")

const Port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(Port, ()=> {
  console.log(`Server listening on Local Host Port ${Port}`)
})