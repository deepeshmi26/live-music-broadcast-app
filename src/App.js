import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import ss from "socket.io-stream";
import song from "./assets/music/Samjhawan.mp3";
let socket = io.connect("http://localhost:3001");

let audio = new Audio();

function App() {
  let [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    socket.on("disconnect", (reason) => {
      console.log(reason);
    });

    socket.on("play", async () => {
      audio.play();
    });

    ss(socket).on("play-stream", (stream, { stat }) => {
      console.log("Streaming playing");
      console.log(socket);
    });

    socket.on("pause", () => {
      audio.pause();
    });
  }, []);

  const playHandler = () => {
    if (currentSong === "") {
      setCurrentSong(song);
      audio.src = song;
    }
    console.log("Started playing");
    console.log(socket);
    socket.emit("play");
  };

  const stopHandler = () => {
    socket.emit("pause");
  };

  return (
    <div className="App">
      <button onClick={playHandler}>Play</button>
      <button onClick={stopHandler}> Pause</button>
    </div>
  );
}

export default App;
