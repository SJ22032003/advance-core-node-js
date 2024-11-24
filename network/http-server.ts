import * as http from "node:http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("status", 200);

  res.end(JSON.stringify({ message: "hello world" }));
});

const hostname = "192.xxx.xxx.xx";

server.listen(3099, hostname, () => {
  console.log("SERVER RUNNING");
});
