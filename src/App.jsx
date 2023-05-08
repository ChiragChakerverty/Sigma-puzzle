import React from "react";
import { Route, Routes } from "react-router";

import Homepage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "./App.css";
import Leaderboard from "./Pages/Leaderboard";
import Scoreboard from "./Pages/Scoreboard";
import Level1 from "./Pages/Level1";
import Level2 from "./Pages/Level2";
import Level3 from "./Pages/Level3";
import Level4 from "./Pages/Level4";
import Level5 from "./Pages/Level5";
import Level6 from "./Pages/Level6";

const App = () => {
  return (
    <div>
      {/* // Music */}
      <audio autoPlay loop>
        <source
          source="https://www.bensound.com/bensound-music/bensound-summer.mp3"
          type="audio/mpeg"
        />
      </audio>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/level1" element={<Level1 />} />
        <Route path="/level2" element={<Level2 />} />
        <Route path="/level3" element={<Level3 />} />
        <Route path="/level4" element={<Level4 />} />
        <Route path="/level5" element={<Level5 />} />
        <Route path="/level6" element={<Level6 />} />
      </Routes>
    </div>
  );
};

export default App;
