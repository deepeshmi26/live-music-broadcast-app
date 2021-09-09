const express = require("express");
const path = require("path");
const fileSystem = require("fs");
const app = express();
const server = require("http").Server(app);
const ss = require("socket.io-stream");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const stream = ss.createStream();
  socket.on("play", () => {
    console.log("Clicked something");
    const filePath = path.resolve("./assets/music/Samjhawan.mp3");
    const stat = fileSystem.statSync(filePath);
    const readStream = fileSystem.createReadStream(filePath);
    // pipe stream with response stream
    readStream.pipe(stream);

    ss(socket).emit("play-stream", stream, { stat });
    //io.emit("play");
  });

  socket.on("pause", () => {
    io.emit("pause");
  });
});

server.listen(process.env.PORT || "3001", function () {
  console.log("Server app listening on port 3001!");
});
