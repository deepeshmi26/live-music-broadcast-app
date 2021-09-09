//const audioFile = require("./assets/music/Samjhawan.mp3");
const express = require("express");
const app = express();
const fs = require("fs");
const server = require("http").Server(app);
const path = require("path");
const ss = require("socket.io-stream");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  transports: [
    "websocket",
    "htmlfile",
    "xhr-polling",
    "jsonp-polling",
    "polling",
  ],
  upgrade: false,
  rejectUnauthorized: false,
});

io.on("connection", (socket) => {
  const stream = ss.createStream();

  socket.on("play", () => {
    const filePath = path.join("assets/music/Samjhawan.mp3");
    const stat = fs.statSync(filePath);
    let readStream = fs.createReadStream(filePath);
    readStream.pipe(stream);
    //ss(socket).emit("playStream", stream, { stat });
    //io.emit("play")`;
  });

  socket.on("pause", (msg) => {
    io.emit("pause", msg);
  });
});

server.listen(process.env.PORT || "3001", function () {
  console.log("Server app listening on port 3001!");
});
