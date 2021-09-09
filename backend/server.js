//const audioFile = require("./assets/music/Samjhawan.mp3");
const express = require("express");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("play", () => {
    io.emit("play");
  });

  socket.on("pause", () => {
    io.emit("pause");
  });
});

server.listen(process.env.PORT || "3001", function () {
  console.log("Server app listening on port 3001!");
});
