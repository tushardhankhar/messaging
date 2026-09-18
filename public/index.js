const express = require("express");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();

const PORT = 5500;

app.use(express.static("public"));

let httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Connection Established", socket.id);

  socket.on("join", (userName) => {
    socket.userName = userName;

    const msg = {
      id: socket.id,
      userName: socket.userName,
    };

    io.emit("join", msg);
  });

  socket.on("Chat", (msg) => {
    const message = {
      id: socket.id,
      userName: socket.userName,
      msg,
    };
    io.emit("Chat Message", message);
  });
});
