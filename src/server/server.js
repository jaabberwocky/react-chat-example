import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const PORT = 3001;

// "DB" for now
let msg = [{ id: 0, user: "john", text: "hello world" }];

io.on("connection", (socket) => {
  console.log(`connection established: ${socket.id}`);
  console.log("Sending message...");

  socket.emit("get:msg", { msg: msg });
});

console.log(`starting server on port ${PORT}...`);
httpServer.listen(PORT);
