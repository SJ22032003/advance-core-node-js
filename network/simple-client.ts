import * as net from "node:net";

const client = net.createConnection({ port: 3099, host: "localhost" }, () => {
  client.write("hello from client");
});
