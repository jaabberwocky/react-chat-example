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
let msg = [{ id: 0, user: "john", text: "hello world", time: Date.now() }];

const addNewMsg = (socket, id) => {
  console.log(`Pushing new msg with id ${id}...`);
  msg.push({
    id: id,
    user: "toby",
    text: "hey man!",
    time: Date.now(),
  });
  socket.emit("get:msg", { msg: msg });
};

io.on("connection", (socket) => {
  console.log(`connection established: ${socket.id}`);
  console.log("Sending message...");

  socket.emit("get:msg", { msg: msg });

  let i = 1;
  while (i < 10) {
    setTimeout(addNewMsg, 1000 + (i * 1000), socket, i);
    i = i + 1;
  }
});

console.log(`starting server on port ${PORT}...`);
httpServer.listen(PORT);
