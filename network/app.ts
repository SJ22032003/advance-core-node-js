import * as net from "node:net";

const server = net.createServer((socket) => {
  socket.on("data", (buffer: Buffer) => {
    console.log(buffer.toString("utf-8"));
  });
});

// localhost is a special hostname that points to the local machine | also known as loopback address
// 127.0.0.1 --> localhost
server.listen(3099, "localhost", () => {
  console.log("Server is running", server.address());
});
