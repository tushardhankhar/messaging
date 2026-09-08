const express = require("express");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();

const PORT = 5500;

let httpServer = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("Connection Established", socket.id);

  socket.on("join", (userName) => {
    socket.userName = userName;
  });

  socket.on("Chat", (msg) => {
    console.log(msg);
    socket.emit("Chat Message", msg);
  });
});
