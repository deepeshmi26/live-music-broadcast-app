import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import ss from "socket.io-stream";
const socket = io.connect("http://localhost:3001");

let audio = new Audio();
//let audioContext = new AudioContext();
let source = null;

function App() {
  ss(socket).on("playStream", (stream) => {
    //console.log("Hello World");
    //console.log(stream);
    // stream.on("data", async (data) => {
    //   console.log("Play done");
    // });
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });

  const playHandler = () => {
    console.log(socket);
    socket.emit("play");
  };

  const stopHandler = () => {
    //socket.emit("pause");
  };

  return (
    <div className="App">
      <button onClick={playHandler}>Play</button>
      <button onClick={stopHandler}> Pause</button>
    </div>
  );
}

export default App;
