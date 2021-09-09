import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import song from "./assets/music/Samjhawan.mp3";
const socket = io.connect("http://localhost:3001");

let audio = new Audio();

function App() {
  const [currentSong, setCurrentSong] = useState("");

  useEffect(() => {
    socket.on("disconnect", (reason) => {
      console.log(reason);
    });

    socket.on("play", () => {
      audio.play();
    });

    socket.on("pause", () => {
      audio.pause();
    });
  });

  const playHandler = () => {
    if (currentSong === "") {
      setCurrentSong(song);
      audio.src = song;
    }
    console.log("Clicked playing");
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
